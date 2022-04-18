import React from 'react';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import HttpService from '../../service/HttpService';
import { toastSuccess } from '../../util/ToastUtil';
import { useState } from 'react';


const InfographicDialog = ({ showDialog, closeDialog, url, round }) => {

    const [infographic, setInfographic] = useState()

    const handleUploadEquipmentFile = async (e, id) => {
        if (FileReader && e.target.files[0]) {
            var fr = new FileReader();
            fr.onload = function () {
                document.getElementById('needyImg').src = fr.result;
            }
            await fr.readAsDataURL(e.target.files[0]);
        }
    };



    async function handleInfographicLoad() {


        const file = document.getElementById(`supplementaryFile1`).files[0];
        const data1 = new FormData();
        data1.append('pic', file)

        try {
            const { status } = await HttpService.put(`/api/league/context/about/picture/${round}`, data1)
            if (status === 204) {
                toastSuccess("عکس با موفقیت ثبت گردید")
                window.location.reload()
                closeDialog()
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
                width: '70%',
                margin: 'auto'
            }}>


                <div className='container'>
                    <p className='font-weight-bolder mt-3 mb-3 h6  contentDialogTitle1'> اینفوگرافیک لیگ {round} </p>



                    <div className="col-12 col-sm-auto ">
                        <div className="mx-auto widthStyle colorHeightStyle2 d-flex justify-content-center align-items-center" >

                            <img src={url} id='needyImg' className='imgInfoShowDialog'  />

                        </div>
                    </div>

                    <div className='d-flex justify-content-end align-items-center '>
                        <div className="  d-flex justify-content-start align-items-end mt-3 mb-4">
                            <label className="d-flex align-items-center justify-content-center mb-0 text-white  border rounded-3  input-file" style={{ fontSize: '12.5px', padding: '9px' }}>
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


                        <div className='d-flex justify-content-end mt-3 me-2 mb-4'>
                            <button className='buttonSubmitStyle d-flex align-items-center ' onClick={handleInfographicLoad} > <i className="fa fa-check ms-1" aria-hidden="true"></i> ثبت </button>
                        </div>
                    </div>
                </div>

            </DialogContent>
        </DialogOverlay >);
}

export default InfographicDialog;