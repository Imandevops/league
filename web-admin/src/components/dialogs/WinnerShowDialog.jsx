import React from 'react';
import { DialogContent, DialogOverlay } from '@reach/dialog';




const WinnerShowDialog = ({ showDialog, closeDialog, url, planEnvoy, rank, companyName, team }) => {




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
                width: '50%',
                margin: 'auto'
            }}>

                <div className='viewUserDialogeDiv'></div>

                <div className='container p-4'>
                    <div className='d-flex justify-content-center' style={{ marginBottom: '-67px' }} >
                        <div className='flex-column align-items-center justify-content-center transformHeader'>
                            <div className='d-flex justify-content-center'>
                                <img className='d-flex justify-content-center text-center col-12 col-md-12 col-ms-12  rounded-2 text-center' src={url} style={{ maxWidth: '200px' }} />
                            </div>
                            <p className='col-12 col-md-12 col-ms-12 d-flex justify-content-center text-center fontStyleP'> {planEnvoy} </p>
                            <p className='col-12 col-md-12 col-ms-12 d-flex justify-content-center positionColor text-center '> شرکت {companyName}  </p>
                        </div>
                    </div>



                    <div className='d-flex justify-content-center row'>
                        <div className='col-12 col-md-4 col-lg-4'>
                            <div className='d-flex flex-column'>
                                <div className=' d-flex align-items-center justify-content-center'>
                                    <i class="fa fa-trophy fa-building2" aria-hidden="true"></i>
                                    <p className='fontwp ms-2'>رتبه: </p>
                                    <p className=''>{rank} </p>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className='d-flex justify-content-center mb-4 row'>
                        <div className='col-12 col-md-12 col-lg-12'>
                            <div className='d-flex flex-column'>
                                <div className=' d-flex align-items-center justify-content-center'>
                                    <i class="fa fa-users d-inline mb-0 fa-building2" aria-hidden="true"></i>
                                    <span className='fontwp ms-2'>اعضای تیم: </span>
                                    <span class="" >
                                        {team?.map((p, index) => (index > 0 ? <span className='' > , {p} </span> : <span className='' >{p} </span>
                                        ))}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>




                </div>


            </DialogContent>
        </DialogOverlay >);
}

export default WinnerShowDialog;