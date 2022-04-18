import React, { useState } from 'react';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import AssignNeedyToPlanDialog from '../dialogs/AssignNeedyToPlanDialog';
import HelpDetailsDialog from './HelpDetailsDialog';


const PlanInfoDialog = ({ showDialog, closeDialog, childs }) => {

    const [assignNeedyToPlanDialog, setAssignNeedyToPlanDialog] = useState(false);
    const [helpDetailsDialog, setHelpDetailsDialog] = useState(false);

    const handleHelpDetails = () => {
        setHelpDetailsDialog(true)
    }

    const handleAssignNeedyToPlan = async () => {

        setAssignNeedyToPlanDialog(true)
    };


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
                maxWidth: '600px',
                margin: 'auto'
            }}>

                {assignNeedyToPlanDialog ?
                    <AssignNeedyToPlanDialog
                        childs={childs}
                        showDialog={assignNeedyToPlanDialog}
                        closeDialog={() => setAssignNeedyToPlanDialog(false)}
                    /> : null}

                {helpDetailsDialog ?
                    <HelpDetailsDialog
                        childs={childs}
                        showDialog={helpDetailsDialog}
                        closeDialog={() => setHelpDetailsDialog(false)}
                    /> : null}

                <div className="container d-flex flex-column justify-content-center align-items-center">

                    <p className="border-bottom w-100 text-right pb-3"><span className="m-3"> مشخصات طرح</span></p>

                    <div className="d-flex bg-input-dialog">
                        <p className="text-right mb-0"><span className=""> عنوان :</span></p>
                        <input type="text" id="planName" name="planName" className="flex-grow-1 border-0 rounded mr-3 pr-2 outline-none" readOnly defaultValue={childs.planName} />
                    </div>

                    <div className="d-flex bg-input-dialog mt-3">
                        <p className="text-right mb-0"><span className=""> ماهیت :</span></p>
                        <input type="text" id="planName" name="planName" className="flex-grow-1 border-0 rounded mr-3 pr-2 outline-none" readOnly defaultValue={'نقدی'} />
                    </div>

                    <div className="d-flex bg-input-dialog mt-3">
                        <p className="text-right mb-0"><span className=""> تاریخ شروع:</span></p>
                        <input type="text" id="planName" name="planName" className="flex-grow-1 border-0 rounded mr-3 pr-2 outline-none" readOnly defaultValue={''} />
                    </div>

                    <div className="d-flex bg-input-dialog mt-3">
                        <p className="text-right mb-0"><span className=""> تاریخ پایان:</span></p>
                        <input type="text" id="planName" name="planName" className="flex-grow-1 border-0 rounded mr-3 pr-2 outline-none" readOnly defaultValue={''} />
                    </div>

                    <textarea type="text" id="description" name="description" className="bg-input-dialog mt-3 pb-5" placeholder="توضیحات" />
                    <div className="d-flex mt-5 w-100 justify-content-center"><a className="btn btn-info ml-3 flex-grow-1" onClick={handleAssignNeedyToPlan}>تخصیص نیازمند به طرح</a><a className="btn btn-info flex-grow-1" onClick={handleHelpDetails}>جزئیات کمک</a></div>
                </div>



            </DialogContent>
        </DialogOverlay>);
}

export default PlanInfoDialog;