import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { useState } from "react";
import HttpService from "../../service/HttpService";
import InfographicDialog from "../dialogs/InfographicDialog";
import InfographicShowDialog from "../dialogs/InfographicShowDialoge";
import MainContext from '../context/MainContext';
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { toastSuccess } from "../../util/ToastUtil";




const InfoPic = () => {

  const { setLoadingDialog } = useContext(MainContext)
  const history = useHistory()
  const [infographics, setInfographics] = useState()
  const [infoPicDialog, setInfoPicDialog] = useState(false)
  const [infoShowDialog, setInfoShowDialog] = useState(false)
  const [url, setUrl] = useState()
  const [round, setRound] = useState()

  
  function handleInfoCorrection(url, round) {
    setInfoPicDialog(true)
    setUrl(url)
    setRound(round)
  }


  function handleShowInfo(url, round) {
    setInfoShowDialog(true)
    setUrl(url)
    setRound(round)
  }

  async function getInfographics() {


    setLoadingDialog(true)
    try {
      const { data, status } = await HttpService.get('/api/league/context/about/picture')
      if (status === 200) {

        for (let obj of data) {
          const buffer = Buffer(obj.image.data);
          const blob = new Blob([buffer.buffer], { type: obj.image.type });
          const url = URL.createObjectURL(blob);
          obj.url = url
        }
      }
      setInfographics(data)
    } catch (error) {
      console.log(error);
    }
    setLoadingDialog(false)
  }

  async function handleDelete(round) {
    try {
      confirmAlert({
        message: "آیا از حذف رکورد اطمینان دارید?",
        buttons: [
          {
            label: "بله",
            onClick: () => deleteWinner(),
          },
          {
            label: "خیر",
            onClick: () => history.push("/dashbord/Winners"),
          },
        ],
      });

      async function deleteWinner() {
        try {
          const { data, status } = await HttpService.delete(
            `/api/league/context/about/picture?round=${round}`
          );
          
          if (status === 204) {
            toastSuccess("برنده با موفقیت حذف شد");
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
      {infoPicDialog ?
        <InfographicDialog
          url={url}
          round={round}
          showDialog={infoPicDialog}
          closeDialog={() => setInfoPicDialog(false)}
        /> : null}


      {infoShowDialog ?
        <InfographicShowDialog
          url={url}
          round={round}
          showDialog={infoShowDialog}
          closeDialog={() => setInfoShowDialog(false)}
        /> : null}


      <div className="userTitleContainer">
        <h3 className="widgetLgTitle"> آرشیو اینفوگرافیــک معرفی لیگ</h3>
        <button className="userAddButton d-flex align-items-center justify-content-center" onClick={() => history.push('/dashbord/infoCreate')}> <i className="fa fa-plus ms-2 m-1" aria-hidden="true"></i> لیـگ </button>
      </div>

      <div className=''>
        <table className="widgetLgTable mt-4" style={{ borderRadius: '13px' }}>
          <tr className=" widgetLgTrborder1" >
            <th className=" widgetLgTh  text-center"> معرفی لیگ </th>
            <th className=" widgetLgTh  text-center"> اینفوگرافیــک </th>
            <th className="widgetLgTh ">تغییـــر </th>
          </tr>

{infographics && infographics.length>0 ?
<>

          {infographics?.map((p, index) => (
            <tr className="widgetLgTrborder pb-5">
              <td className="widgetLgTd mb-2">معرفی لیگ {p.image.round}</td>
              <td className="widgetLgTd text-center " style={{ paddingRight: "25px" }}>
                <img
                  src={p.url}
                  alt=""
                  className="widgetLgImg1 m-1 p-2"
                />
              </td>

              <td className="widgetLgTd mb-2">
                  <button className='Approved mb-2' type="Approved" onClick={() => handleShowInfo(p.url, p.image.round)}  > نمایش</button> 
                | <button className='Pending mb-2' type="Pending" onClick={() => handleInfoCorrection(p.url, p.image.round)} > ویرایش</button>
                {/* | <button className="redcolor mb-2" type="Pending" onClick={() => handleDelete(p.image.round)}> حذف </button> */}
              </td>
            </tr>
          ))}
          </>
          : <p className='text-end m-4 '>اطلاعاتی جهت نمایش وجود ندارد!</p>}
        </table>
      </div>

    </div>

  );
}

export default InfoPic;