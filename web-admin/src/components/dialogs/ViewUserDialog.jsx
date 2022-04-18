import React from 'react';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import HttpService from '../../service/HttpService';
import { toastError, toastSuccess } from '../../util/ToastUtil';
import contactuser from '../../static/image/contactuser.png';
import { useEffect } from 'react';
import { useState } from 'react';




const ViewUserDialog = ({ showDialog, closeDialog, userId }) => {

    const [userInfo, setUserInfo] = useState({})

    console.log('userId', userId);

    async function getUser() {

        try {

            const { data, status } = await HttpService.get(`/api/league/iam/loadUser/${userId}`)
            if (status === 200) {
                console.log('useeer' , data);

                    const buffer = Buffer(data.image.data);
                    const blob = new Blob([buffer.buffer], { type: data.image.type });
                    const url = URL.createObjectURL(blob);
                    data.url = url
                

                setUserInfo(data)

            }

        } catch (error) {
            toastError(error.response.data.message);
        }

    }



    useEffect(() => {
        getUser()
    }, [])


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

                <div className='viewUserDialogeDiv'></div>

                <div className='container p-4'>
                    <div className='d-flex justify-content-center' style={{ marginBottom: '-67px' }} >
                        <div className='flex-column align-items-center justify-content-center transformHeader'>
                            <div className='d-flex justify-content-center'>
                                <img className='d-flex justify-content-center text-center col-12 col-md-12 col-ms-12 viewUserDialogeImg  rounded-circle text-center' src={userInfo.url} />
                            </div>
                            <p className='col-12 col-md-12 col-ms-12 d-flex justify-content-center text-center fontStyleP'>{`${userInfo.name} ${userInfo.family}`} </p>
                            <p className='col-12 col-md-12 col-ms-12 d-flex justify-content-center positionColor text-center '> شرکت {userInfo.companyNamePer}  </p>
                        </div>
                    </div>



                    <div className='d-flex justify-content-center  row'>
                        <div className='col-12 col-md-4 col-lg-4'>
                            <div className='d-flex flex-column'>

                                <div className=' d-flex align-items-center justify-content-start'>

                                    <i class="fa fa-building fa-building2" aria-hidden="true"></i>
                                    <p className='fontwp ms-2'>سمت سازمانی : </p>
                                    <p className=''>{userInfo.organizationLevelName} </p>
                                </div>
                            </div>
                        </div>

                        <div className='col-12 col-md-4 col-lg-4 me-4 '>
                            <div className='d-flex flex-column'>

                                <div className=' d-flex align-items-center justify-content-start paddingrow '>
                                    <i className="fa fa-user fa-user2 " aria-hidden="true"></i>
                                    <p className='fontwp ms-2'>نام کاربری  : </p>
                                    <p className=''>{userInfo.username} </p></div>
                            </div>
                        </div>
                    </div>






                    <div className='d-flex justify-content-center mt-3 mb-4 row'>
                        <div className='col-12 col-md-4 col-lg-4'>
                            <div className='d-flex flex-column'>

                                <div className=' d-flex align-items-center justify-content-start'>
                                    <i class="fa fa-envelope fa-envelope-o2 " aria-hidden="true"></i>
                                    <p className='fontwp ms-2'>ایمیل   : </p>
                                    <p className=''>{userInfo.email} </p>
                                </div>
                            </div>
                        </div>


                        <div className='col-12 col-md-4 col-lg-4 me-4 '>
                            <div className='d-flex flex-column'>

                                <div className=' d-flex align-items-center justify-content-start paddingrow'>
                                    <i class="fa fa-phone" aria-hidden="true"></i>
                                    <p className='fontwp ms-2'>شماره تماس  : </p>
                                    <p className=''>{userInfo.mobile} </p></div>
                            </div>
                        </div>

                    </div>




                </div>


            </DialogContent>
        </DialogOverlay >);
}

export default ViewUserDialog;