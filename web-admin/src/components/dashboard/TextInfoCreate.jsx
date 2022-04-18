import React, { useState } from 'react';
import TextInfoCreateDialog from '../dialogs/TextInfoCreateDialog';
import image2 from '../../static/image/image2.png';
import { toastError, toastSuccess, toastWarning } from '../../util/ToastUtil';


const TextInfoCreate = () => {


    const [textInfoCreateDialog, setTextInfoCreateDialog] = useState(false)
    const [description, setDescription] = useState('')
    const [pic, setPic] = useState()
    const [picShow, setPicShow] = useState()


    function handleGoToPreview() {


        if (!document.getElementById(`supplementaryFile1`).files[0] ){
            toastError("ورود عکس اجباری است")
             return
        }

        setTextInfoCreateDialog(true)
        const picShow = document.getElementById('infoImg').src;
        const descriptionText = document.getElementById('content-description1').value;
        const picture = document.getElementById(`supplementaryFile1`).files[0];

        // var element = document.getElementById('supplementaryFile1');
        // var file = element.files[0];
        // var blob = file.slice(0, file.size, 'image/png');
        // const picture = new File([blob], 'first.png', { type: 'image/png' });
        // console.log(picture);


        setDescription(descriptionText)
        setPic(picture)
        setPicShow(picShow)
    }




    const handleUploadEquipmentFile = async (e) => {
        if (FileReader && e.target.files[0]) {
            var fr = new FileReader();
            fr.onload = function () {
                document.getElementById('infoImg').src = fr.result;
            }
            await fr.readAsDataURL(e.target.files[0]);
        }
    };




    return (

        <div className='container'>
            {textInfoCreateDialog ?
                <TextInfoCreateDialog
                    context={description}
                    picture={pic}
                    picShow={picShow}
                    showDialog={textInfoCreateDialog}
                    closeDialog={() => setTextInfoCreateDialog(false)}
                /> : null}

            <p className='font-weight-bolder mt-3 mb-3 h6 m-2'>متن اینفوگرافیک لیگ:</p>
            <div className='d-flex'>


                <div className=" col-md-6 col-6 align-items-start  justify-content-center">
                    <div className="d-flex justify-content-center align-items-start  " >
                        <img src={image2} id='infoImg' className=' ' style={{ height: '338px', width: '500px', objectFit: 'contain', borderRadius: '10px' }} />
                    </div>

                    <div className="mt-2 px-1 d-flex justify-content-center align-items-center ">
                        <label className="d-flex align-items-center justify-content-center mb-0 p-2 cursor-pointer  uploadPicStyle  ">
                            <i className="fa fa-fw fa-camera ms-1" aria-hidden="true"></i>
                            <input
                                onChange={(e) => handleUploadEquipmentFile(e)}
                                type="file"
                                title="&nbsp;"
                                accept="image/png, image/jpeg"
                                className="d-none border-radius-05rem-0-0-05rem cursor-pointer"
                                id="supplementaryFile1"
                            />
                            آپلود عکس
                        </label>
                    </div>
                </div>

                <textarea className=' col-md-6 col-6 border-0 p-3 contentTextArea1' id='content-description1' placeholder='متن خود را تایپ کنید' />
            </div>

            <div className='d-flex justify-content-end mt-3'>
                <button className='buttonViewStyle' onClick={handleGoToPreview} >پیش نمایش</button>
            </div>

        </div>





    );
}

export default TextInfoCreate;