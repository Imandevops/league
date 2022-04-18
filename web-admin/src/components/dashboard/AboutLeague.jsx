import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import HttpService from '../../service/HttpService';
import AboutCorrectinDialog from '../dialogs/AboutCorrectinDialog';
import AboutShowDialog from '../dialogs/AboutShowDialog';
import MainContext from '../context/MainContext';
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { toastSuccess } from "../../util/ToastUtil";




const AboutLeague = () => {
    const { setLoadingDialog } = useContext(MainContext)
    const history = useHistory()
    const [content, setContent] = useState([])
    const [aboutCorrectinDialog, setAboutCorrectinDialog] = useState(false)
    const [round, setRound] = useState()
    const [aboutText, setAboutText] = useState()
    const [aboutShowDialog, setAboutShowDialog] = useState(false)



    function handleCorrection(round, aboutText) {
        setAboutCorrectinDialog(true)
        setRound(round)
        setAboutText(aboutText)

    }

    function handleShow(aboutText) {
        setAboutShowDialog(true)
        setAboutText(aboutText)
    }


    async function getAboutContent() {
        setLoadingDialog(true)
        try {
            const { data, status } = await HttpService.get('/api/league/context/about/text')
           
            if (status === 200) {
                setContent(data)
            }
        } catch (error) {
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
                onClick: () => deleteAbout(),
              },
              {
                label: "خیر",
                onClick: () => history.push("/dashbord/Winners"),
              },
            ],
          });
    
          async function deleteAbout() {
            try {
               
              const { data, status } = await HttpService.delete(
                `/api/league/context/about/text?round=${round}`
              );
              
              if (status === 204) {
                toastSuccess("درباره لیگ با موفقیت حذف شد");
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
        getAboutContent()
    }, [])



    return (
        <div className="widgetLg1 ">
            {aboutCorrectinDialog ?
                <AboutCorrectinDialog
                    aboutText={aboutText}
                    round={round}
                    showDialog={aboutCorrectinDialog}
                    closeDialog={() => setAboutCorrectinDialog(false)}
                /> : null}

            {aboutShowDialog ?
                <AboutShowDialog
                    aboutText={aboutText}
                    showDialog={aboutShowDialog}
                    closeDialog={() => setAboutShowDialog(false)}
                /> : null}


            <div className="userTitleContainer">
                <h3 className="widgetLgTitle"> آرشیو درباره لیگ</h3>

                <button className="userAddButton d-flex align-items-center justify-content-center" onClick={() => history.push('/dashbord/aboutCreate')}> <i className="fa fa-plus ms-2 m-1" aria-hidden="true"></i> لیگ </button>
            </div>


            <div className='d-flex justify-content-center' >
                <table className="widgetLgTable mt-4" >
                    <>
                        <tr className="widgetLgTr">
                            <th className=" widgetLgTh  text-end"> لیگ </th>
                            <th className="widgetLgTh ">تغییر </th>
                        </tr>
                    </>

                    {content && content.length > 0 ?
                        <>
                            {content?.map((p, index) => (
                                <tr className="widgetLgTr pb-5">
                                    <td className="widgetLgTd text-end mb-2" style={{ paddingRight: '24px' }}> درباره لیگ {p.round}</td>
                                    <td className="widgetLgTd  mb-2">
                                        <button className='Approved mb-2' type="Approved" onClick={() => handleShow(p.aboutText)}  > نمایش</button> | <button className='Pending mb-2' type="Pending" onClick={() => handleCorrection(p.round, p.aboutText)} > ویرایش</button>
                                        {/* | <button className="redcolor mb-2" type="Pending" onClick={() => handleDelete(p.round)}> حذف </button> */}
                                    </td>
                                </tr>

                            ))}
                        </>
                        :
                        <p className='text-end m-4 '>اطلاعاتی جهت نمایش وجود ندارد!</p>}

                </table>

            </div>


        </div>
    );
}

export default AboutLeague;