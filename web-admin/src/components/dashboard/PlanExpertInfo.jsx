import React, { useState } from 'react';
import { toastError, toastSuccess } from '../../util/ToastUtil';
import HttpService from '../../service/HttpService'
import { useHistory } from 'react-router';





const PlanExpertInfo = () => {


    const history = useHistory()

  



    async function handleRegister(e) {
        e.preventDefault()

        const planUniqueName = document.getElementById("planUniqueName").value;
        const planName = document.getElementById("planName").value;
        const NameAndFamily = document.getElementById("NameAndFamily").value;
        const specializedLevel = document.getElementById("specializedLevel").value;
        const serviceLocation = document.getElementById("serviceLocation").value;
     

       

        const body = {
            planUniqueName,planName,
            NameAndFamily, specializedLevel, serviceLocation
        }

      
       

        try {
            const { status } = await HttpService.post('/api/league/PlanExpertInfo/',body)
            if (status === 200) {
                toastSuccess("کاربر با موفقیت ثبت گردید")
                // history.push('/dashbord/viewUser')
                window.location.reload()
            }
        } catch (ex) {
            toastError(ex.response.data.message);
        }

    }

    



    return (
        <div className='container '>
            <div className='d-flex justify-content-center'  >
                <div className="d-flex flex-column mt-4 mb-4 p-4 border-0 border-radius-10px card1 card col-xl-10  ">

                    <h4 className='d-flex justify-content-center mt-4'>فرم ثبت اطلاعات هویتی کارشناس</h4>


                  

                    <div className='d-flex justify-content-center mt-4 row'>
                        <div className='col-12 col-md-4 col-lg-4'>
                            <div className='d-flex flex-column'>
                                <div className=' d-flex align-items-center justify-content-center'>
                                    <input class="pcenter my-0 flex-grow-1 py-2 px-1 mx-0 outline-none" placeholder='شناسه طرح' id='planUniqueName' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-center mt-4 row'> <div className='d-flex justify-content-center mt-4 row'>
                        <div className='col-12 col-md-4 col-lg-4'>
                            <div className='d-flex flex-column'>
                                <div className=' d-flex align-items-center justify-content-center'>
                                    <input class="pcenter my-0 flex-grow-1 py-2 px-1 mx-0 outline-none" placeholder='عنوان طرح' id='planName' />
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-md-4 col-lg-4'>
                            <div className='d-flex flex-column'>
                                <div className=' d-flex align-items-center justify-content-center px-0'>
                                    <input class="pcenter my-0 flex-grow-1 py-2 px-1 mx-0 outline-none" placeholder='نام خانوادگی کارشناس' id='NameAndFamily' />
                                </div>
                            </div>
                        </div>

                        <div className='col-12 col-md-4 col-lg-4'>
                            <div className='d-flex flex-column'>
                                <div className=' d-flex align-items-center justify-content-center px-0'>
                                    <input class="pcenter my-0 flex-grow-1 py-2 px-1 mx-0 outline-none" placeholder='سمت شغلی' id='specializedLevel' />
                                </div>
                            </div>
                        </div>

                        <div className='col-12 col-md-4 col-lg-4'>
                            <div className='d-flex flex-column'>
                                <div className=' d-flex align-items-center justify-content-center px-0'>
                                    <input class="pcenter my-0 flex-grow-1 py-2 px-1 mx-0 outline-none" placeholder='محل خدمت' id='serviceLocation' />
                                </div>
                            </div>
                        </div>


                  
                    </div>


              



                    <div className='d-flex justify-content-center mt-3 row'>

                        <div className=' d-flex justify-content-center col-12 col-md-6 col-lg-3'>
                            <button className='formbutton2  flex-grow-1 mx-4 outline-0' onClick={handleRegister} > ثبت </button>
                        </div>
                    </div>



                </div>
            </div>
            </div>


        </div>
    );
}

export default PlanExpertInfo;