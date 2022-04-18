import "./user.css";
import { useHistory } from "react-router";
import HttpService from "../../service/HttpService";
import React, { useContext, useEffect, useState } from 'react';
import MainContext from '../context/MainContext';
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { toastSuccess } from "../../util/ToastUtil";



const WidgetLg = () => {
  const { setLoadingDialog } = useContext(MainContext)
  const history = useHistory()
  const [judges, setJudges] = useState()

  async function getViewUsers() {
    setLoadingDialog(true)
    try {
      const { data, status } = await HttpService.get('/api/league/context/judge')
      if (status === 200) {
        for (let obj of data) {
          const buffer = Buffer(obj.image.data);
          const blob = new Blob([buffer.buffer], { type: obj.image.type });
          const url = URL.createObjectURL(blob);
          obj.url = url
        }
      }
      setJudges(data)

    } catch (error) {
      console.log(error);
    }
    setLoadingDialog(false)
  }

  const handleContinue = (judgeId) => {
    history.push(`/dashbord/user/${judgeId}`)

  }
  async function handleDelete(Id) {
    try {
      confirmAlert({
        message: "آیا از حذف رکورد اطمینان دارید?",
        buttons: [
          {
            label: "بله",
            onClick: () => deleteJudge(),
          },
          {
            label: "خیر",
            onClick: () => history.push("/dashbord/Judges"),
          },
        ],
      });

      async function deleteJudge() {
        try {
          const { data, status } = await HttpService.delete(
            `/api/league/context/judge/${Id}`
          );

          if (status === 200) {
            toastSuccess("داور با موفقیت حذف شد");
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
    getViewUsers()
  }, [])




  return (
    <div className="widgetLg1">
      <div className="userTitleContainer">
        <h3 className="widgetLgTitle">لیست داوران</h3>
        <button className="userAddButton d-flex justify-content-center align-items-center" onClick={() => history.push('/dashbord/newJudges')}><i className="fa fa-plus ms-2 m-1" aria-hidden="true"></i> ایجاد داور</button>
      </div>



      <table className="widgetLgTable mt-4">
        <tr className="widgetLgTr">
          <th className="widgetLgTh   text-end"> داور </th>
          <th className="widgetLgTh " style={{ paddingRight: "25px" }}>سمت داور </th>
          <th className="widgetLgTh ">تغییر </th>
        </tr>
        {judges && judges.length>0 ?
        <>
          {judges?.map((p, index) => (
            <tr className="widgetLgTr1 pb-5">
              <td className="widgetLgTd text-end " style={{ paddingRight: "25px" }}>
                <img
                  src={p.url}
                  alt=""
                  className="widgetLgImg mb-2 ms-2"
                />
                <span className='mb-2'>{p.name}</span>
              </td>
              <td className="widgetLgTd mb-2" style={{ width: '280px' }}>{p.position}</td>
              <td className="widgetLgTd mb-2">
                  <button className='Pending mb-2' type="Pending" onClick={() => handleContinue(p.id)} > ویرایش</button>    
                  <button className="redcolor mb-2" type="Pending" onClick={() => handleDelete(p.id)}> حذف </button>                 
              </td>
            </tr>
          ))}
        </>
        : <p className='text-end m-4 '>اطلاعاتی جهت نمایش وجود ندارد!</p> }
      </table>




    </div>
  );
}
export default WidgetLg;
