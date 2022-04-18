import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import "./user.css";
import HttpService from '../../service/HttpService';
import { toastError, toastSuccess } from '../../util/ToastUtil';
import { useEffect } from 'react';

const User = ({ judgeId }) => {
  const history = useHistory();
  const [judgeInfo, setJudgeInfo] = useState({})

  async function getJudge() {

    try {
      const { data, status } = await HttpService.get(`/api/league/context/judge/${judgeId}`)
      if (status === 200) {
        
        const buffer = Buffer(data.image.data);
        const blob = new Blob([buffer.buffer], { type: data.image.type });
        const url = URL.createObjectURL(blob);
        data.url = url


        setJudgeInfo(data)
      }

    } catch (error) {

    }

  }


  const handleUploadEquipmentFile = async (e, id) => {
    if (FileReader && e.target.files[0]) {
      var fr = new FileReader();
      fr.onload = function () {
        document.getElementById('needyImg').src = fr.result;
      }
      await fr.readAsDataURL(e.target.files[0]);
    }
  };


  async function handleUpdatJudge(e) {
    e.preventDefault()

    const name = document.getElementById("name").value;
    const position = document.getElementById("position").value;
   


    const body = {
        name, position
    }

    const file = document.getElementById(`supplementaryFile1`).files[0];
    const data1 = new FormData();

    data1.append('body', JSON.stringify(body))
    data1.append('pic', file)

    try {
        const { status } = await HttpService.put(`/api/league/context/judge/${judgeId}`, data1)
        if (status === 200) {
            toastSuccess("داور با موفقیت ثبت گردید")
            history.push('/dashbord/judges')
            window.location.reload()

        }
    } catch (ex) {
       
    }

}









  useEffect(() => {
    getJudge()
  }, [])


  return (
    <div className='d-flex justify-content-center'>
      <div className="newUser container">

        <h4 className="newUserTitle">ویرایش داور </h4>
        <div className="newUserShow">
          <div className="userUpdateUpload d-flex align-items-center flex-column justify-content-center">
            <div className="mx-auto widthStyle" >
              <div className="d-flex justify-content-center align-items-center rounded colorHeightStyle rounded-circle " >
                <img src={judgeInfo.url} id='needyImg' className=' rounded-circle shadow' style={{height:'140px', width:'140px' }} />
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

          <form className="newUserForm mt-4">
            <div className="newUserItem" >
              <label>نام و نام خانوادگی</label>
              <input type="text" id='name' defaultValue={judgeInfo.name} />
            </div>
            <div className="newUserItem">
              <label> سمت   </label>
              <input type="text" id='position' defaultValue={judgeInfo.position} />
            </div>
            <div className="newUserItemB">
              <button className="newUserButton mb-5" onClick={handleUpdatJudge} >ثبت</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default User;
