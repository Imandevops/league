import React from 'react';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import HttpService from '../../service/HttpService';
import { toastSuccess } from '../../util/ToastUtil';
import { useHistory } from 'react-router';


const AboutLeagueDialog = ({ showDialog, closeDialog, description }) => {
const history=useHistory()

    async function handleCreateAbout() {

        const body = {
            aboutText: description,
        }
        try {
            const { status } = await HttpService.post('/api/league/context/about/text', body)
            if (status === 200) {
                closeDialog()
                history.push('/dashbord/aboutLeague')
                toastSuccess("محتوا با موفقیت ثبت گردید")
            }
        } catch (ex) { }
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
                width: '90%',
                margin: 'auto'
            }}>

                <div className=''>

                    <p className='font-weight-bolder  h5 contentDialogTitle1'> درباره لیگ</p>
                    <p className=' p-4 contentDialogTextArea' id='content-description'>{description} </p>
                    <div className='d-flex justify-content-end mt-2 m-3'>
                        <button className='buttonSendStyle ' onClick={handleCreateAbout} >ارسال </button>
                    </div>

                </div>

            </DialogContent>
        </DialogOverlay >);
}

export default AboutLeagueDialog;