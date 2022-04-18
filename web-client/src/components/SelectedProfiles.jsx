import React from "react";

import { useHistory } from "react-router";
import HttpService from "../service/HttpService";
import { useContext, useEffect, useState } from "react";
import Header from "./common/Header";
import MainContext from "./context/MainContext";
import { toastSuccess } from "../util/ToastUtil";

// import { confirmAlert } from "react-confirm-alert"; // Import
// import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const SelectedProfiles = () => {
  const history = useHistory();
  const [selectedProfiles, setSelectedProfiles] = useState();
  const [url, setUrl] = useState();

  const [id, setId] = useState();

  async function getSelectedProfiles() {
    try {

    
      
      const { data, status } = await HttpService.get(
        "/api/league/selectedProfiles"
      );
      if (status === 200) {
        for (let obj of data) {
          const buffer = Buffer(obj.image.data);
          const blob = new Blob([buffer.buffer], { type: obj.image.type });
          const url = URL.createObjectURL(blob);
          obj.url = url;
        }
      }

      setSelectedProfiles(data);
    } catch (error) {
      console.log(error);
    }
  }

  const RemoveFiltering =async () => {

    document.getElementById('courseTitle').value = '';
    document.getElementById('nature').value = 0;
  }
  

  const handleSearch =async () => {
    
        const courseTitle = document.getElementById("courseTitle").value;
        const nature = document.getElementById("nature").value;
    
    if(courseTitle != 0 || nature != 0)
    {
      
      const { data, status } = await HttpService.get(`/api/league/selectedProfiles/search?courseTitle=${courseTitle}&&nature=${nature}`);
                                                    
      if (status === 200) {
        for (let obj of data) {
          const buffer = Buffer(obj.image.data);
          const blob = new Blob([buffer.buffer], { type: obj.image.type });
          const url = URL.createObjectURL(blob);
          obj.url = url;
        }
      }
    
      setSelectedProfiles(data);
    }
    else
    {
      const { data, status } = await HttpService.get(
        "/api/league/selectedProfiles"
      );
      if (status === 200) {
        for (let obj of data) {
          const buffer = Buffer(obj.image.data);
          const blob = new Blob([buffer.buffer], { type: obj.image.type });
          const url = URL.createObjectURL(blob);
          obj.url = url;
        }
      }
      
      setSelectedProfiles(data);
    }
    
  };

  const handleView = (Id) => {
    history.push(`/SelectedProfileView/${Id}`);
  };

  useEffect(() => {
    getSelectedProfiles();
  }, []);

  return (
    <div className="widgetLg1">
      <Header />

      <div className="container mt-5">
        
        <div className=' boxcolor1 shadow mt-5 mb-5 mx-auto ' >
             <div className='d-flex justify-content-between mt-5 mb-5 mx-5 row'>
                   
                    <div className='col-12 col-md-4 mt-5  col-lg-5' >
                        <input className='border p-2 pcenter' style={{backgroundColor:"lightgreen"}} placeholder='عنوان دوره' size={36} type="text" id='courseTitleLable' readOnly />
                        <br/><br/>                       
                        <select  className='w-100 border p-2 pcenter'  id='courseTitle' >                                      
                            <option selected value="" disabled> انتخاب دوره</option>
                            <option  value="1">دوره اول</option>
                            <option  value="2">دوره دوم</option>
                            <option  value='3'>دوره سوم</option>
                            <option  value='4'>دوره چهارم</option>
                            <option  value='5'>دوره پنجم</option>
                            <option  value='6'>دوره ششم</option>
                        </select>
                    </div>
                    <div className='col-12 col-md-4 mt-5 col-lg-6' >
                        <input className='border p-2 pcenter' style={{backgroundColor:"lightgreen"}} placeholder='ماهیت آثار نوآورانه' size={32} type="text" id='natureLable' readOnly />
                        <br/><br/>
                        <select  className=" w-75 border p-2 pcenter"  id='nature'>                                      
                            <option value="0" selected disabled> ماهیت</option>
                            <option value="idea">ایده</option>
                            <option value="study">مطالعه و پژوهش</option>
                            <option value="primary product">محصول اولیه</option>
                            <option value="final product">محصول نهایی</option>
                        </select>
                    </div>
              
            </div>
            <div className='d-flex justify-content-center mt-3 row'>

                        <div className=' d-flex justify-content-center col-12 mb-5 col-md-50 col-lg-7'>
                            <button className='formbutton2  flex-grow-1 mx-4 outline-0' onClick={() => handleSearch()}> نمایش نتایج گزارش </button>
                            <button className='formbutton1  flex-grow-1 mx-4 outline-0' onClick={() => RemoveFiltering()}>حذف شرایط </button>
                        </div>
            </div>
        </div>
        <table className="widgetLgTable mt-4">
          <tr className="widgetLgTr">
            <th className="widgetLgTh "></th>
            <th className="widgetLgTh "> نام و نام خانوادگی برنده </th>

            <th className="widgetLgTh ">نام شرکت</th>

            <th className="widgetLgTh "> مقام مرحله ای </th>
            
            <th className="widgetLgTh "> مقام کلی </th>

            
            <th className="widgetLgTh "> </th>
          </tr>

          {selectedProfiles && selectedProfiles.length > 0 ? (
            <>
              {selectedProfiles?.map((p, index) => (
                <tr className="widgetLgTr1 pb-5">
                  <td
                    className="widgetLgTd text-end "
                    style={{ paddingRight: "25px" }}
                  >
                    <img src={p.url} alt="" className="widgetLgImg mb-2 ms-2" />
                    <span className="mb-2">{p.planEnvoy}</span>
                  </td>
                  <td className="widgetLgTd mb-2">{p.name + p.family}</td>

                  <td className="widgetLgTd mb-2">{p.companyName}</td>

                  <td className="widgetLgTd mb-2">
                    {p.designsProvidedList[0].stagePosition}
                  </td>

                  <td className="widgetLgTd mb-2">
                    {p.designsProvidedList[0].generalPosition}
                  </td>
                 
                  <td className="widgetLgTd mb-2">
                    <button
                      className="Pending mb-2"
                      type="Pending"
                      onClick={() => handleView(p.id, p.url)}
                    >
                      {" "}
                      نمایش اطلاعات بیشتر
                    </button>
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <p className="text-end m-4 ">اطلاعاتی جهت نمایش وجود ندارد!</p>
          )}
        </table>
      </div>
    </div>
  );
};
export default SelectedProfiles;
