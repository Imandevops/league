import React from 'react';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import HttpService from '../../service/HttpService';
import { toastSuccess } from '../../util/ToastUtil';


const PlanCorrectionDialogs = ({ showDialog, closeDialog, falseCheckboxes, dialogBody, planId }) => {



    async function success() {

        try {
            const { status } = await HttpService.put(`/api/league/plan/adminCheck/${planId}`, dialogBody)

            if (status === 200) {
               
                toastSuccess("طرح برای اصلاح ارسال شد")
                closeDialog()
            }

        } catch (error) {

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
                borderRadius: '10px',
                boxShadow: '0px 10px 50px hsla(0, 0%, 0%, 0.33)',
                height: 'unset',
                maxWidth: '1200px',
                width: '50%',
                margin: 'auto'
            }}>



                <div className='container '>

                    <p class=" my-0  px-3 py-4 mx-2" name='c12'>
                        <h6 className='mb-2'>فیلدهای زیر خالی مانده است :</h6>
                        <div className='d-flex flex-column'>
                            {falseCheckboxes?.map((p,index) => (
                                <span className='pt-0 mx-0 '> <i class="fa fa-times" style={{fontSize:'0.6rem' , color:'red' }} aria-hidden="true"></i> {p.name}</span>
                            ))}
                        </div>
                        <div className='d-flex justify-content-between'>
                            <button className='btn px-5  btn-danger mt-3 shadow-none' onClick={closeDialog} > رد </button>
                            <button className='btn  btn-primary mt-3 shadow-none' style={{ paddingInline: '39px' }} onClick={success} > تایید </button>
                        </div>
                    </p>
                    {/* <button className='btn btn-primary mt-3' > ارسال </button> */}
                </div>


            </DialogContent>
        </DialogOverlay>);
}

export default PlanCorrectionDialogs;