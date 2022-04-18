import "./user.css";
import { useHistory } from "react-router";
import HttpService from "../../service/HttpService";
import MainContext from '../context/MainContext';
import React, { useContext, useEffect, useState } from 'react';
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { toastSuccess } from "../../util/ToastUtil";

const News = () => {

    const { setLoadingDialog } = useContext(MainContext)
    const history = useHistory()
    const [news, setNews] = useState()

    async function getNews() {
        setLoadingDialog(true)
        try {
            const { data, status } = await HttpService.get('/api/league/context/news')
            if (status === 200) {
                setNews(data)
                console.log('dataaaaaaaaa', data);
            }
        } catch (error) {
            console.log(error);
        }
        setLoadingDialog(false)
    }


    const handleContinue = (newsId) => {
        history.push(`/dashbord/newsCorrection/${newsId}`)
    }


    async function handleDelete(Id) {
        try {
          confirmAlert({
            message: "آیا از حذف رکورد اطمینان دارید?",
            buttons: [
              {
                label: "بله",
                onClick: () => deleteNews(),
              },
              {
                label: "خیر",
                onClick: () => history.push("/dashbord/Winners"),
              },
            ],
          });
    
          async function deleteNews() {
            try {
              const { data, status } = await HttpService.delete(
                `/api/league/context/news/${Id}`
              );
              
              if (status === 204) {
                toastSuccess("خبر با موفقیت حذف شد");
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
        getNews()
    }, [])




    return (
        <div className="widgetLg1">
            <div className="userTitleContainer">
                <h3 className="widgetLgTitle">لیست اخبار</h3>
                <button className="userAddButton  d-flex align-items-center justify-content-center" onClick={() => history.push('/dashbord/newsCreate')}><i className="fa fa-plus ms-2 m-1 " aria-hidden="true"></i> ایجاد خبر</button>
            </div>



            <table className="widgetLgTable mt-4">
                <tr className="widgetLgTrborder1">
                    <th className=" widgetLgTh  text-center"> عنوان خبر </th>
                    <th className=" widgetLgTh p-4 text-center"> متن خبر </th>
                    <th className="widgetLgTh ">تغییر </th>
                </tr>

                {news && news.length > 0 ?
                    <>
                        {news?.map((p, index) => (
                            <tr className="widgetLgTrborder pb-5">
                                <td className="widgetLgTd text-center p-4 mb-2" style={{ width: '150px' }} > {p.newsTitle.substring(0, 25)}... </td>
                                <td className="widgetLgTd text-end p-4 mb-2" style={{ maxWidth: '940px', width: '440px' }}><p className='pt-4 mb-0  newsTextArea mx-auto' style={{ textAlign: 'justify' }} name="" id="" >  {p.newsText.substring(0, 250)}... </p> </td>
                                <td className="widgetLgTd  p-2 mb-2 ">
                                    <button className='Pending ' type="Pending" onClick={() => handleContinue(p.newsId)} > ویرایش</button>
                                    | <button className="redcolor mb-2" type="Pending" onClick={() => handleDelete(p.newsId)}> حذف </button>
                                </td>
                            </tr>
                        ))}

                    </> :
                    <p className='text-end m-4 '>اطلاعاتی جهت نمایش وجود ندارد!</p>
                }
            </table>




        </div>
    );
}
export default News;
