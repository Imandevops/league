import React, { useContext, useEffect, useState } from 'react';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import HttpService from '../../service/HttpService';
import { toastSuccess } from '../../util/ToastUtil';
import MainContext from '../context/MainContext';


const AssignNeedyToPlanDialog = ({ showDialog, closeDialog, childs }) => {

    const { setLoadingDialog } = useContext(MainContext)
    const [needys, setNeedys] = useState([])
    const [needysAssignToPlan, setNeedysAssignToPlan] = useState([])
    const [IdForassignNeedyToPlan, setIdForAssignNeedyToPlan] = useState('')
    const [assignNeedyPlanId, setAssignNeedyPlanId] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [count, setCount] = useState(0)


    const getAllNeedys = async () => {

        setLoadingDialog(true)
        try {
            let { status, data } = await HttpService.get(`/api/admin/user?page=${currentPage - 1}`)
            if (status === 200) {
                setNeedys(data)
            }
        } catch (error) { }
        setLoadingDialog(false)

    };

    const getAllNeedysAssignToPlan = async () => {

        setLoadingDialog(true)
        try {
            let { status, data } = await HttpService.get(`/api/admin/loadNeedyForPlan?page=0&planId=${childs.planId}`)
            if (status === 200) {
                setNeedysAssignToPlan(data)
            }
        } catch (error) { }
        setLoadingDialog(false)

    };

    const handleSetIdForAssignNeedyToPlan = (id, i) => {
        setIdForAssignNeedyToPlan(id)
        document.getElementById(i).style.color = 'green'
    }

    const handleSetIdForRemoveNeedyToPlan = (id, i) => {
        setIdForAssignNeedyToPlan(id)
        setAssignNeedyPlanId(i)
        document.getElementById(id).style.color = 'red'
    }

    const handleAssignNeedyToPlan = async () => {

        const body = { planId: childs.planId, personIds: [IdForassignNeedyToPlan], fDate: new Date().getTime(), tDate: new Date().getTime() + 1 }

        setLoadingDialog(true)
        try {
            let { status } = await HttpService.post(`/api/admin/assignNeedyToPlan`, body)
            if (status === 200) {
                getAllNeedysAssignToPlan()
            }
        } catch (error) { }
        setLoadingDialog(false)

    };

    const handleRemoveNeedyToPlan = async () => {

        // const body = { planId: childs.planId, personIds: [IdForassignNeedyToPlan], assignNeedyPlanId }
        setLoadingDialog(true)
        try {
            let { status } = await HttpService.delete(`/api/admin/deleteNeedyFromPlan?planId=${childs.planId}&personIds=${IdForassignNeedyToPlan}&assignNeedyPlanId=${assignNeedyPlanId}`)
            if (status === 204) {
                getAllNeedysAssignToPlan()
            }
        } catch (error) { }
        setLoadingDialog(false)

    };

    useEffect(() => {
        getAllNeedys()
        getAllNeedysAssignToPlan()
    }, []);

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
                maxWidth: '155rem',
                margin: 'auto'
            }}>

                <div className="d-flex flex-column justify-content-center align-items-center">
                    <p className="border-bottom w-100 text-right pb-3"><span className="m-3"> تخصیص نیازمند به طرح</span></p>

                    <div className="d-flex bg-input-dialog">
                        <p className="text-right mb-0"><span className=""> عنوان :</span></p>
                        <input type="text" id="planName" name="planName" className="flex-grow-1 border-0 rounded mr-3 pr-2 outline-none" readOnly defaultValue={childs.planName} />
                    </div>

                    <div className="row mt-2 w-100 mx-0 justify-content-center">

                        <div className='col-5 '>

                            <p className='text-right mt-2 font-weight-bolder text-grey'>لیست نیازمندان</p>

                            {needys && needys.length > 0 ?

                                <ul className='list-group'>

                                    {needys.map(

                                        (needy, index) =>

                                            <li onClick={() => handleSetIdForAssignNeedyToPlan(needy.personId, index)} id={index} className={`list-group-item text-right cursor-pointer ${false ? 'font-weight-bolder' : ''}`}>
                                                {`${needy.name} ${needy.family}`}
                                            </li>

                                    )}

                                </ul>

                                : <p className="text-center">اطلاعاتی جهت نمایش وجود ندارد</p>}

                        </div>

                        <div className="col-1 d-flex flex-column align-items-center justify-content-center">
                            <i className="fa fa-2x text-success fa-arrow-circle-left cursor-pointer mb-2" aria-hidden="true" onClick={handleAssignNeedyToPlan}></i>
                            <i className="fa fa-2x text-danger fa-arrow-circle-right cursor-pointer" aria-hidden="true" onClick={handleRemoveNeedyToPlan}></i>
                        </div>

                        <div className='col-5'>
                            <p className='text-right mt-2 text-grey font-weight-bolder'> نیازمندان تخصیص یافته به طرح</p>

                            {needysAssignToPlan && needysAssignToPlan.length > 0 ?

                                <ul className='list-group'>

                                    {needysAssignToPlan.map(

                                        (a) =>

                                            <li onClick={() => handleSetIdForRemoveNeedyToPlan(a.persons.id, a.assignNeedyPlanId)} id={a.persons.id} className={`list-group-item text-right cursor-pointer ${false ? 'font-weight-bolder' : ''}`}>
                                                {`${a.persons.name} ${a.persons.family}`}
                                            </li>

                                    )}

                                </ul>

                                : <p className="text-center">اطلاعاتی جهت نمایش وجود ندارد</p>}
                        </div>

                    </div>

                    <div className="d-flex mt-5"><a className="btn btn-info ml-3 px-5" onClick={closeDialog}>ذخیره</a><a className="btn btn-outline-info text-info px-5" onClick={closeDialog}>انصراف</a></div>
                </div>

            </DialogContent>
        </DialogOverlay>);
}

export default AssignNeedyToPlanDialog;