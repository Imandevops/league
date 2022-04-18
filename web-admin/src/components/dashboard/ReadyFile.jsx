import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
// import {
//   LocationSearching,
//   MailOutline,
//   PermIdentity,
//   PhoneAndroid,
//   Publish,
// } from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./user.css";
import contactuser from '../../static/image/contactuser.png';
import contactuser2 from '../../static/image/contactuser2.jpg';

const User = ({  }) => {
  c



  const handleUploadEquipmentFile = async (e, id) => {
    if (FileReader && e.target.files[0]) {
      var fr = new FileReader();
      fr.onload = function () {
        document.getElementById('needyImg').src = fr.result;
      }
      await fr.readAsDataURL(e.target.files[0]);
    }
  };





  return (
    <div className="user">
      <div className="userTitleContainer">
        <h4 className="userTitle">تغییر اطلاعات داور</h4>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={contactuser}
              alt=""
              className="userShowImg"
            />

            <div className="userShowTopTitle">
              <span className="userShowUsername">{judgeInfo.name}</span>
              <span className="userShowUserTitle">{judgeInfo.position} </span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">جزئیات حساب کاربری</span>
            <div className="userShowInfo">
              <i className="fa fa-user fa-user1 " aria-hidden="true"></i>
              <span className="userShowInfoTitle">نام کاربری</span>
            </div>

            <span className="userShowTitle">اطلاعات دسترسی</span>
            <div className="userShowInfo">
              <i class="fa fa-mobile fa-lg" aria-hidden="true"></i>
              <span className="userShowInfoTitle">989121402354+</span>
            </div>
            <div className="userShowInfo">
              <i class="fa fa-envelope-o " aria-hidden="true"></i>
              <span className="userShowInfoTitle">judges@gmail.com</span>
            </div>
            <div className="userShowInfo">
              <i class="fa fa-building-o" aria-hidden="true"></i>
              <span className="userShowInfoTitle"> اسم شرکت </span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle"> تغییر اطلاعات داور </span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>نام کاربری</label>
                <input
                  type="text"
                  placeholder="sari2345"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>نام و نام خانوادگی جدید </label>
                <input
                  type="text"
                  placeholder="محمد ساریخانی"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>ایمیل جدید</label>
                <input
                  type="text"
                  placeholder="judegs@gmail.com"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>شماره تماس</label>
                <input
                  type="text"
                  placeholder="989121402345+"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>نام شرکت جدید</label>
                <input
                  type="text"
                  placeholder="بهسازان ملت"
                  className="userUpdateInput"
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">

                <div className="userUpdateUpload d-flex align-items-center flex-column justify-content-center">
                  <div className="mx-auto widthStyle" >
                    <div className="d-flex justify-content-center align-items-center rounded colorHeightStyle" >
                      <img src={contactuser2} id='needyImg' alt="" />
                    </div>
                  </div>
                  <div className="mt-1 px-1 d-flex justify-content-start align-items-end">
                    <label className="d-flex align-items-center justify-content-center mb-0 p-2 text-white  border rounded-3  input-file" style={{ backgroundColor: 'rgb(15, 15, 240)' }}>
                      <i className="fa fa-fw fa-camera ms-1" aria-hidden="true"></i>
                      <input
                        onChange={(e) => handleUploadEquipmentFile(e, 'supplementaryFile1Lodead')}
                        type="file"
                        title="&nbsp;"
                        accept="image/png, image/jpeg"
                        className="d-none border-radius-05rem-0-0-05rem cursor-pointer"
                        id="supplementaryFile1"
                      />
                      آپلود عکس
                      <p className='mb-0 me-2 text-success' id="supplementaryFile1Lodead"></p>
                    </label>
                  </div>
                </div>



                <label htmlFor="file" className='d-flex align-items-center'>
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton">اعمال تغییرات</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default User;
