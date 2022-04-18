import React from 'react';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import HttpService from '../../service/HttpService';
import { toastSuccess } from '../../util/ToastUtil';
import image2 from '../../static/image/image2.png';


const TextInfoCorrectionDialog = ({ showDialog, closeDialog, url, description, id, getInfographics }) => {

    const handleUploadEquipmentFile = async (e) => {
        if (FileReader && e.target.files[0]) {
            var fr = new FileReader();
            fr.onload = function () {
                document.getElementById('infoImg').src = fr.result;
            }
            await fr.readAsDataURL(e.target.files[0]);
        }
    };

    async function handleSubmiteInfo() {


        const file = document.getElementById(`supplementaryFile1`).files[0];
        const context = document.getElementById("content-description1").value;
        const body = {
            context
        }
        const data1 = new FormData();
        data1.append('body', JSON.stringify(body))
        data1.append('pic', file)

        try {
            const { status } = await HttpService.put(`/api/league/context/info/${id}`, data1)
            if (status === 200) {
                toastSuccess("ویرایش با موفقیت انجام شد")
                closeDialog()
                getInfographics()
            }
        } catch (ex) {

        }

    }


    return (
        <DialogOverlay
            isOpen={showDialog}
            onDismiss={closeDialog}
            className="d-flex justify-content-center align-items-center"
            style={{ background: 'rgb(53 53 53 / 62%)' }}
        >
            <DialogContent style={{
                padding: '0px',
                borderRadius: '3px',
                boxShadow: '0px 10px 50px hsla(0, 0%, 0%, 0.33)',
                height: 'unset',
                maxWidth: '1200px',
                width: '80%',
                margin: 'auto',
            }}>


                <div className=''>
                    <p className='font-weight-bolder mt-3 mb-3 h6  contentDialogTitle1'> اینفوگرافیک لیگ </p>


                    <div className='d-flex justify-content-center container '>


                        <div className=" col-md-5 col-5 ms-1 align-items-start ">
                            <div className="d-flex justify-content-center align-items-start  " >
                                <img src={url} id='infoImg' className=' ms-3 ' style={{ height: '338px', width: '500px', borderRadius: '10px', objectFit: 'contain' }} />
                            </div>

                            <div className="mt-2 px-1 d-flex justify-content-center align-items-center">
                                <label className="d-flex align-items-center justify-content-center mb-0 p-2 cursor-pointer ms-3 uploadPicStyle1  ">
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

                        <textarea className=' col-md-6 col-6  border-0 p-3 contentTextArea2' id='content-description1' defaultValue={description} />
                    </div>

                    <div className='d-flex justify-content-end mt-4'>
                        <button className='buttonViewStyle  mb-4 ps-4 pe-4' style={{ marginLeft: '57px' }} onClick={handleSubmiteInfo} > ثبت </button>
                    </div>

                </div>


            </DialogContent>
        </DialogOverlay >);
}

export default TextInfoCorrectionDialog;