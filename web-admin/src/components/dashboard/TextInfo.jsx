import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import HttpService from "../../service/HttpService";
import TextInfoCorrectionDialog from "../dialogs/TextInfoCorrectionDialog";
import TextInfoShowDialog from "../dialogs/TextInfoShowDialog";
import MainContext from '../context/MainContext';
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { toastSuccess } from "../../util/ToastUtil";





const InfoPic = () => {

    const { setLoadingDialog } = useContext(MainContext)
    const history = useHistory()
    const [infographics, setInfographics] = useState()

    const [textInfoCorrectionDialog, setTextInfoCorrectionDialog] = useState(false)
    const [textInfoShowDialog, setTextInfoShowDialog] = useState(false)

    const [url, setUrl] = useState()
    const [context, setContext] = useState()
    const [infoId, setInfoId] = useState()

    function handleInfoCorrection(url, context, id) {
        setTextInfoCorrectionDialog(true)
        setUrl(url)
        setContext(context)
        setInfoId(id)
    }


    function handleShowInfo(url, context) {
        setTextInfoShowDialog(true)
        setUrl(url)
        setContext(context)
    }

    async function getInfographics() {
        setLoadingDialog(true)
        try {
            const { data, status } = await HttpService.get('/api/league/context/info')
            console.log('data', data);
            if (status === 200) {
                for (let obj of data) {
                    const buffer = Buffer(obj.image.data);
                    const blob = new Blob([buffer.buffer], { type: obj.image.type });
                    const url = URL.createObjectURL(blob);
                    obj.url = url
                }
                setInfographics(data)
            }

        } catch (error) {
            console.log(error);
        }
        setLoadingDialog(false)
    }


    async function handleDelete(Id) {
        try {
          confirmAlert({
            message: "آیا از حذف رکورد اطمینان دارید?",
            buttons: [
              {
                label: "بله",
                onClick: () => deleteInfo(),
              },
              {
                label: "خیر",
                onClick: () => history.push("/dashbord/Winners"),
              },
            ],
          });
    
          async function deleteInfo() {
            try {
              const { data, status } = await HttpService.delete(
                `/api/league/context/info/${Id}`
              );
              
              if (status === 204) {
                toastSuccess("اینفوگرافیــک با موفقیت حذف شد");
                window.location.reload();
              }
            } catch (error) {
              console.log(error);
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    useEffect(() => {
        getInfographics()
    }, [])




    return (
        <div className="widgetLg1">

            {textInfoCorrectionDialog ?
                <TextInfoCorrectionDialog
                    getInfographics={getInfographics}
                    id={infoId}
                    url={url}
                    description={context}
                    showDialog={textInfoCorrectionDialog}
                    closeDialog={() => setTextInfoCorrectionDialog(false)}
                /> : null}


            {textInfoShowDialog ?
                <TextInfoShowDialog
                    url={url}
                    description={context}
                    showDialog={TextInfoShowDialog}
                    closeDialog={() => setTextInfoShowDialog(false)}
                /> : null}


            <div className="userTitleContainer">
                <h3 className="widgetLgTitle"> آرشیو اینفوگرافیــک و جداول</h3>
                <button className="userAddButton d-flex align-items-center justify-content-center" onClick={() => history.push('/dashbord/textInfoCreate')}> <i className="fa fa-plus ms-1 m-1" aria-hidden="true"></i> اینفوگرافیک </button>
            </div>

            <div className=''>
                <table className="widgetLgTable mt-4">
                <tr className=" widgetLgTrborder1" >

                <th className=" widgetLgTh  text-center" > اینفوگرافیــک </th>
                <th className=" widgetLgTh p-4 text-end"> متن اینفوگرافیــک  </th>
                <th className="widgetLgTh ">تغییـــر </th>
                </tr>


            {infographics && infographics.length>0?
                <>

            {infographics?.map((p) => (
                <tr className="widgetLgTrborder pb-5">

                <td className="widgetLgTd text-end " >
                <img
                src={p.url}
                alt=""
                className="widgetLgImg2 w-100"
                />

                </td>
                <td className="widgetLgTd text-end p-4 mb-2" style={{ maxWidth: '940px', width: '440px' }}> {p.context.substring(0, 160)} ...</td>
                <td className="widgetLgTd mb-2">
                <button className='Approved mb-2' type ="Approved" onClick={() => handleShowInfo(p.url, p.context)}  > نمایش</button> |  <button className='Pending mb-2' type ="Pending" onClick={() => handleInfoCorrection(p.url, p.context, p.id)} > ویرایش</button>
                | <button className="redcolor mb-2" type="Pending" onClick={() => handleDelete(p.id)}> حذف </button>
                </td>
                </tr>
            ))}
            </>
               : <p className='text-end m-4 '>اطلاعاتی جهت نمایش وجود ندارد!</p> }
                </table>
            </div>

        </div>

    );
}

export default InfoPic;