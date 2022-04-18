import React from 'react';
import { DialogContent, DialogOverlay } from '@reach/dialog';



const AboutShowDialog = ({ showDialog, closeDialog, aboutText }) => {

  

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
                    <p className=' p-4 contentDialogTextArea' id='content-description'>{aboutText} </p>
                    <div className='d-flex justify-content-end mt-2 m-3'>
                        <button className='buttonSendStyle1 ' onClick={()=>closeDialog()} >تایید </button>
                    </div>

                </div>

            </DialogContent>
        </DialogOverlay >);
}

export default AboutShowDialog;