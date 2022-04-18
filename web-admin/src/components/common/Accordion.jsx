import React, { useState } from "react";
import PlanInfoDialog from "../dialogs/PlanInfoDialog";


const Accordion = ({ title, children, className, logoImage, state, isChild, childs }) => {

    const [planInfoDialog, setPlanInfoDialog] = useState(false);
    const [isOpen, setOpen] = useState(false);

    const handlePlanInfoDialog = () => {
        if(isChild)
        setPlanInfoDialog(true)
    }

    return (

        <>

            {planInfoDialog ?
                <PlanInfoDialog
                    childs={childs}
                    showDialog={planInfoDialog}
                    closeDialog={() => setPlanInfoDialog(false)}
                /> : null}

            {state === 'menu' ?
                <div className={`accordion-wrapper mt-0 ${className}`}>

                    <div className={`accordion-title ${isOpen ? "open" : ""}`} onClick={() => setOpen(!isOpen)}>
                        <div className="d-flex align-items-center">
                            <img className="ml-2 max-dim-icon-menu ms-2" src={logoImage} alt="baseInfoLogo" />
                            {title}
                        </div>
                    </div>
 
                    <div className={`accordion-item ${!isOpen ? "collapsed" : ""}`}>
                        <div className="accordion-content">{children}</div>
                    </div>

                </div>
                :
                <div className={`accordion-wrapper mt-1 ${className}`}>

                    <div className={`d-flex accordion-title-plan ${isOpen ? "open" : ""}`} onClick={() => setOpen(!isOpen)}>
                        <div className="d-flex align-items-center justify-content-between w-100">
                            <span onClick={handlePlanInfoDialog} className={`${isChild ? 'child-hover' : ''}`}>{title}</span>
                            <img className="" src={logoImage} alt="baseInfoLogo" />
                        </div>
                    </div>

                    <div className={`accordion-item ${!isOpen ? "collapsed" : ""}`}>
                        <div className="accordion-content-plan mb-3">{children}</div>
                    </div>

                </div>
            }
        </>
    );
};




export default Accordion;
