import React from 'react';
import { DialogContent, DialogOverlay } from '@reach/dialog';




const InfographicShowDialog = ({ showDialog, closeDialog, url, round }) => {




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


                <div className='container'>
                    <p className='font-weight-bolder mt-3 mb-3 h6  contentDialogTitle1'> اینفوگرافیک لیگ {round} </p>



                    <div className="col-12 col-sm-auto ">
                        <div className="mx-auto widthStyle colorHeightStyle2 d-flex justify-content-center align-items-center" >

                            <img src={url} id='needyImg' className='imgInfoShowDialog' />

                        </div>
                    </div>


                    <div className='d-flex justify-content-end mt-3 me-2 mb-4'>
                        <button className='buttonSubmitStyle d-flex align-items-center' onClick={()=>closeDialog()} > <i className="fa fa-check ms-1" aria-hidden="true"></i> تایید </button>
                    </div>
                </div>

        </DialogContent>
        </DialogOverlay >);
}

export default InfographicShowDialog;