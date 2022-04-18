import React, { useState } from 'react';
import image2 from '../../static/image/image2.png';
import GalleryCreateDialog from '../dialogs/GalleryCreateDialog';
import { toastError, toastSuccess, toastWarning } from '../../util/ToastUtil';


const NewGallery = () => {


    const [galleryCreateDialog, setGalleryCreateDialog] = useState(false)
    const [description, setDescription] = useState('')
    const [pic, setPic] = useState()
    const [picShow, setPicShow] = useState()
    const [leagueRound, setleagueRound] = useState()



    function handleGoToPreview(){

        if (document.getElementById('leagueRound').value == '0'){
            alert( ' هیچ دوره ای برای لیگ انتخاب نشده است ')
            return
        }

        if (!document.getElementById(`supplementaryFile1`).files[0] ){
            toastError("ورود عکس اجباری است")
             return
        }


        setGalleryCreateDialog(true)
        const picShow = document.getElementById('infoImg').src;
        const descriptionText = document.getElementById('content-description1').value;
        const leagueRound = document.getElementById('leagueRound').value;
        const picture = document.getElementById(`supplementaryFile1`).files[0];
        setDescription(descriptionText)
        setPic(picture)
        setPicShow(picShow)
        setleagueRound(leagueRound)
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
            {galleryCreateDialog ?
                <GalleryCreateDialog
                    context={description}
                    picture={pic}
                    picShow={picShow}
                    round={leagueRound}
                    showDialog={galleryCreateDialog}
                    closeDialog={() => setGalleryCreateDialog(false)}
                /> : null}

            <p className='font-weight-bolder mt-3 mb-3 h6 m-2'>متن گالری تصاویر :</p>

            <div className="me-3 mb-3 border-radius-10px ">
                    <select className="w-100 outline-none border-0 " id="leagueRound" >
                        <option className='outline-none border-0 bg-gray' selected value="0" disabled>انتخاب دوره </option>
                        <option className='outline-none border-0 ' value="1">دوره اول</option>
                        <option className='outline-none border-0 ' value="2">دوره دوم</option>
                        <option className='outline-none border-0 ' value='3'>دوره سوم</option>
                        <option className='outline-none border-0 ' value='4'>دوره چهارم</option>
                        <option className='outline-none border-0 ' value='5'>دوره پنجم</option>
                        <option className='outline-none border-0 ' value='6'>دوره ششم</option>
                    </select>
                </div>


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

export default NewGallery;