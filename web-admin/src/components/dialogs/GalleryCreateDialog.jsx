import React from 'react';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import { toastSuccess } from '../../util/ToastUtil';
import HttpService from '../../service/HttpService';
import { useHistory } from 'react-router';




const GalleryCreateDialog = ({ showDialog, closeDialog, picture, context, picShow, round }) => {


    const hisrory =useHistory()

    async function handleCreateTextInfo() {



        const body = {
            context , round
        }

        const data1 = new FormData();
        data1.append('body', JSON.stringify(body))
        data1.append('pic', picture)


        try {
            const { status } = await HttpService.post('/api/league/context/gallery', data1)
            if (status === 200) {
                toastSuccess("ثبت با موفقیت انجام شد")
                // window.location.reload()
                closeDialog()
                hisrory.push('/dashbord/gallery')
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


                <div className=''>
                    <p className='font-weight-bolder mt-3 mb-3 h6  contentDialogTitle1'> گالری تصاویر دوره {round} </p>

                    <div className="col-12 col-sm-auto ">
                        <div className="mx-auto widthStyle colorHeightStyle4 d-flex justify-content-center align-items-center" >
                            <img src={picShow} id='infoImg' className='imgInfoShowDialog1' />
                        </div>
                    </div>

                    <p className=' p-4 contentDialogTextArea1' id='content-description'>{context}</p>

                    <div className='d-flex justify-content-end mt-3 m-4'>
                        <button className='buttonSendStyle' onClick={handleCreateTextInfo} >ارسال </button>
                    </div>
                </div>

            </DialogContent>
        </DialogOverlay >);
}

export default GalleryCreateDialog;