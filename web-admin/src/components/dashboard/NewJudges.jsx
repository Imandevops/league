import React from 'react';
import contactuser2 from '../../static/image/contactuser2.jpg';
import { toastError, toastSuccess, toastWarning } from '../../util/ToastUtil';
import HttpService from '../../service/HttpService';
import { useHistory } from 'react-router';



const NewJudges = () => {

const history = useHistory()

  const handleUploadEquipmentFile = async (e, id) => {
    if (FileReader && e.target.files[0]) {

      var fr = new FileReader();

      fr.onload = function () {
        document.getElementById('needyImg').src = fr.result;
      }
      await fr.readAsDataURL(e.target.files[0]);
    }
  };




  async function handleJudgesRegister(e) {
    e.preventDefault()

    if (!document.getElementById(`supplementaryFile1`).files[0] ){
         toastError("ورود عکس اجباری است")
          return
  }

    const name = document.getElementById("name").value;
    const position = document.getElementById("position").value;

    const body = {
      name, position
    }



    const file = document.getElementById(`supplementaryFile1`).files[0];
    
    

    const data1 = new FormData();

    data1.append('body', JSON.stringify(body))
    data1.append('file', file)


    try {
      const { status } = await HttpService.post('/api/league/context/judge', data1)
      if (status === 200) {
        toastSuccess("کاربر با موفقیت ثبت گردید")
        history.push('/dashbord/judges')
        window.location.reload()
      }
    } catch (ex) {

    }

  }






  return (
    <div className='d-flex justify-content-center'>
      <div className="newUser container">

        <h4 className="newUserTitle">افزودن داور جدید</h4>
        <div className="newUserShow">
          <div className="userUpdateUpload d-flex align-items-center flex-column justify-content-center">
            <div className="mx-auto widthStyle" >
              <div className="d-flex justify-content-center align-items-center rounded colorHeightStyle rounded-circle" >
                <img src={contactuser2} id='needyImg' className=' rounded-circle ' style={{ height: '140px', width: '140px' }} />
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
              <input type="text" id='name' placeholder="نام و نام خانوادگی" />
            </div>
            <div className="newUserItem">
              <label> سمت   </label>
              <input type="text" id='position' placeholder="سمت " />
            </div>

            <div className="newUserItemB">
              <button className="newUserButton mb-5" onClick={handleJudgesRegister} >ثبت</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default NewJudges;
