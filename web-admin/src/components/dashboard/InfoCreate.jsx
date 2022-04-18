import React, { useState } from 'react';
import { useHistory } from 'react-router';
import HttpService from '../../service/HttpService';
import image from '../../static/image/image.png';
import { toastError, toastSuccess, toastWarning } from '../../util/ToastUtil';


const InfoCreate = () => {

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





    async function handleInfographicLoad(e) {
        e.preventDefault()

        if (!document.getElementById(`supplementaryFile1`).files[0] ){
            toastError("ورود عکس اجباری است")
             return
        }


        const file = document.getElementById(`supplementaryFile1`).files[0];
        const data1 = new FormData();

        data1.append('pic', file)


        try {
            const { status } = await HttpService.post('/api/league/context/about/picture', data1)
            if (status === 200) {
                toastSuccess("عکس با موفقیت ثبت گردید")
                history.push('/dashbord/infoPic')
                window.location.reload()

            }
        } catch (ex) {

        }

    }




    return (

        <div className='container'>
            <p className='font-weight-bolder mt-3 mb-3 h6 m-2'> اینفوگرافیک لیگ : </p>



            <div className="col-12 col-sm-auto ">
                <div className="mx-auto widthStyle colorHeightStyle3 d-flex justify-content-center align-items-center" >
                    <img src={image} id='needyImg' style={{ width: '', height: '500px' , borderRadius:'20px'}} />
                </div>
            </div>

            <div className='d-flex justify-content-end align-items-center'>
                <div className="  d-flex justify-content-start align-items-end mt-3">
                    <label className="d-flex align-items-center justify-content-center mb-0 p-2 text-white  border rounded-3  input-file" >
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
                    </label>
                </div>


                <div className='d-flex justify-content-end mt-3 me-2'>
                    <button className='buttonSubmitStyle d-flex align-items-center ' onClick={handleInfographicLoad} > <i className="fa fa-check ms-1" aria-hidden="true"></i> ثبت </button>
                </div>
            </div>
        </div>


    );
}

export default InfoCreate;