import React, { useEffect, useState } from 'react';
import { DialogContent, DialogOverlay } from '@reach/dialog';

import HttpService from '../../service/HttpService';
import { toastError, toastSuccess, toastWarning } from '../../util/ToastUtil';
import { useHistory } from 'react-router';


const PlanExpertInfoCorrectionDialog = ({ showDialog, closeDialog, id,planUniqueName, planName,nameAndFamily,specializedLevel,serviceLocation }) => {

    const history = useHistory()

    
    async function handlePlanExpertInfoCorrection() {

        
   
        const nameAndFamily = document.getElementById("nameAndFamily").value;
        const specializedLevel = document.getElementById("specializedLevel").value;
        const serviceLocation = document.getElementById("serviceLocation").value;
       
       


        const body = {
            planUniqueName, planName, nameAndFamily, specializedLevel, serviceLocation
        }
        
   
        try {
            const { status } = await HttpService.put(`/api/league/PlanExpertInfo/${id}`,body)
            if (status === 200) {
                toastSuccess("کارشناسی طرح با موفقیت ویرایش گردید")
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

                <h4 className='d-flex justify-content-center mt-6'>فرم ویرایش اطلاعات هویتی کارشناس</h4></div>
                            
                <div className='container p-4'>
                    
          
                    <div className='d-flex justify-content-center row'>
                        <div className='col-12 col-md-4 col-lg-9'>
                            <div className='d-flex flex-column'>
                                <div className=' d-flex align-items-center justify-content-center'>                                   
                                    <input
                                        defaultValue={planUniqueName}
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
                                        defaultValue={planName}
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
                                        defaultValue={nameAndFamily}
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
                                        defaultValue={specializedLevel}
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
                                        defaultValue={serviceLocation}
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
                    <button className="formbutton2 mb-5" onClick={handlePlanExpertInfoCorrection} >در انتظار کارشناسی</button>
                </div>



                </div>


            </DialogContent>
        </DialogOverlay >);
}

export default PlanExpertInfoCorrectionDialog;