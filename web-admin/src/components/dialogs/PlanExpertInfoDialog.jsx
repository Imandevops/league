import React, { useEffect, useState } from 'react';
import { DialogContent, DialogOverlay } from '@reach/dialog';

import HttpService from '../../service/HttpService';
import { toastError, toastSuccess, toastWarning } from '../../util/ToastUtil';
import { useHistory } from 'react-router';


const PlanExpertInfoDialog = ({ showDialog, closeDialog, planUniqueName, planName,planId }) => {

    const history = useHistory()

    

    async function handlePlanExpertInfoRegister() {

        
   
        const nameAndFamily = document.getElementById("nameAndFamily").value;
        const specializedLevel = document.getElementById("specializedLevel").value;
        const serviceLocation = document.getElementById("serviceLocation").value;

        const undergraduateStatus = 'UExpert'
       



        const body = {
            planUniqueName, planName, nameAndFamily, specializedLevel, serviceLocation
        }


        const PlanBody = {
            undergraduateStatus
        }

     
        
        try {
            const { status } = await HttpService.post('/api/league/PlanExpertInfo',body)
            if (status === 200) {

                const { status } = await HttpService.put(`/api/league/Plan/${planId}`,PlanBody)
                toastSuccess("طرح با موفقیت کارشناسی گردید")
                history.push('/dashbord/PlanReview')
                window.location.reload()

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
                height: '450px',
                maxWidth: '500px',
                width: '50%',
                margin: 'auto'
            }}>

                <div className='viewUserDialogeDiv'>

                <h4 className='d-flex justify-content-center mt-6'>فرم ثبت اطلاعات هویتی کارشناس</h4></div>
                            
                <div className='container p-4'>
                    
                {/* <div className='d-flex justify-content-center mt-4 row'>
                        <div className='col-12 col-md-4 col-lg-4'>
                            <div className='d-flex flex-column'>
                                <div className=' d-flex align-items-center justify-content-center'>
                                    <input class="pcenter my-0 flex-grow-1 py-2 px-1 mx-0 outline-none" placeholder='شناسه طرح' id='planUniqueName' />
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <div className='d-flex justify-content-center row'>
                        <div className='col-12 col-md-4 col-lg-9'>
                            <div className='d-flex flex-column'>
                                <div className=' d-flex align-items-center justify-content-center'>                                   
                                    <input
                                        value={planUniqueName}
                                        id='planUniqueName'
                                        type="text"
                                        placeholder="شناسه طرح"
                                        className="userUpdateInput"
                                        readOnly
                                    />
                                
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className='d-flex justify-content-center row'>
                        <div className='col-12 col-md-4 col-lg-9'>
                            <div className='d-flex flex-column'>
                                <div className=' d-flex align-items-center justify-content-center'>                                   
                                    <input
                                        value={planName}
                                        id='planName'
                                        type="text"
                                        placeholder="عنوان طرح"
                                        className="userUpdateInput"
                                        readOnly
                                    />
                                
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className='d-flex justify-content-center row'>
                        <div className='col-12 col-md-4 col-lg-9'>
                            <div className='d-flex flex-column'>
                                <div className=' d-flex align-items-center justify-content-center'>                                   
                                    <input
                                        id='nameAndFamily'
                                        type="text"
                                        placeholder="نام و نام خانوادگی"
                                        className="userUpdateInput"
                                    />
                                
                                </div>
                            </div>
                        </div>
                    </div>

                    <br/>
                    <div className='d-flex justify-content-center row'>
                        <div className='col-12 col-md-4 col-lg-9'>
                            <div className='d-flex flex-column'>
                                <div className=' d-flex align-items-center justify-content-center'>                                   
                                    <input
                                        id='specializedLevel'
                                        type="text"
                                        placeholder="سمت شغلی"
                                        className="userUpdateInput"
                                    />
                                
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className='d-flex justify-content-center row'>
                        <div className='col-12 col-md-4 col-lg-9'>
                            <div className='d-flex flex-column'>
                                <div className=' d-flex align-items-center justify-content-center'>                                   
                                    <input
                                        id='serviceLocation'
                                        type="text"
                                        placeholder="محل خدمت"
                                        className="userUpdateInput"
                                    />
                                
                                </div>
                            </div>
                        </div>
                    </div>

                    <br/>
                <div className=" d-flex justify-content-center" style={{ width: '500px' }}>
                    <button className="formbutton2 mb-5" onClick={handlePlanExpertInfoRegister} >در انتظار کارشناسی</button>
                </div>



                </div>


            </DialogContent>
        </DialogOverlay >);
}

export default PlanExpertInfoDialog;