import React from 'react';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import HttpService from '../../service/HttpService';
import { toastSuccess } from '../../util/ToastUtil';
import { useState } from 'react';
import { useEffect } from 'react';


const AboutCorrectinDialog = ({ showDialog, closeDialog ,round, aboutText }) => {

    


  

    async function handleCorrectionAbout() {
        const description = document.getElementById('content-description1').value
        const body = {
            aboutText: description,
            round: round,
        }

        try {
            const { status } = await HttpService.put(`/api/league/context/about/text?round=${round}`, body)
            if (status === 204) {
                closeDialog()
                toastSuccess("محتوا با موفقیت ثبت گردید")
                window.location.reload()
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



                <p className='contentDialogTitle'> درباره لیگ</p>
                <textarea className=' textAreaDialogStyle p-3 ' id='content-description1' defaultValue={aboutText} />
                <div className='d-flex justify-content-end '>
                    <button className='buttonSendStyle mb-3 ' onClick={handleCorrectionAbout} >ثبت </button>
                </div>

            </DialogContent>
        </DialogOverlay >);
}

export default AboutCorrectinDialog;