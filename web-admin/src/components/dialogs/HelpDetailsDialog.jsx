import React, { useContext, useEffect, useState } from 'react';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import HttpService from '../../service/HttpService';
import trashIcon from '../../static/image/trashIcon.png';
import pencilIcon from '../../static/image/pencilIcon.png';
import MainContext from '../context/MainContext';
// import Pagination from '../common/Pagination';
// import CreateHelpToNeedyDialog from './CreateHelpToNeedyDialog';
// import DeleteCashAssistance from './DeleteCashAssistance';
// import EditCashAssistance from './EditCashAssistance';


const HelpDetailsDialog = ({ showDialog, closeDialog, childs }) => {

    const { setLoadingDialog } = useContext(MainContext)

    const [cashAssistanceDetailId, setCashAssistanceDetailId] = useState('');
    const [editCashAssistance, setEditCashAssistance] = useState(false);
    const [deleteCashAssistance, setDeleteCashAssistance] = useState(false);
    const [createHelpToNeedyDialog, setCreateHelpToNeedyDialog] = useState(false);
    const [cashAssistance, setCashAssistance] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [count, setCount] = useState(0)


    const handleDeleteCash = (id) => {
        setDeleteCashAssistance(true)
        setCashAssistanceDetailId(id)
    }

    const handleEditCash = (id) => {
        setEditCashAssistance(true)
        setCashAssistanceDetailId(id)
    }


    const getAllcashAssistance = async () => {

        setLoadingDialog(true)
        try {
            const { status, data } = await HttpService.get(`/api/admin/cashAssistance?planId=${childs.planId}`)
            if (status === 200) {
                setCashAssistance(data)
            }
        } catch (error) { }
        setLoadingDialog(false)

    };

    useEffect(() => {
        getAllcashAssistance()
    }, [])

    return (

        <div>
{/* 
            {createHelpToNeedyDialog ?
                <CreateHelpToNeedyDialog
                    childs={childs}
                    getAllcashAssistance={getAllcashAssistance}
                    showDialog={createHelpToNeedyDialog}
                    closeDialog={() => setCreateHelpToNeedyDialog(false)}
                /> : null}

            {editCashAssistance ?
                <EditCashAssistance
                    childs={childs}
                    cashAssistanceDetailId={cashAssistanceDetailId}
                    getAllcashAssistance={getAllcashAssistance}
                    showDialog={editCashAssistance}
                    closeDialog={() => setEditCashAssistance(false)}
                /> : null}


            {deleteCashAssistance ?
                <DeleteCashAssistance
                    cashAssistanceDetailId={cashAssistanceDetailId}
                    getAllcashAssistance={getAllcashAssistance}
                    showDialog={deleteCashAssistance}
                    closeDialog={() => setDeleteCashAssistance(false)}
                /> : null}

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
                    maxWidth: '1600px',
                    margin: 'auto'
                }}>



                    <div className="d-flex flex-column" >

                        <button className="d-flex align-items-center admin-btn text-white align-self-end mb-3" onClick={() => setCreateHelpToNeedyDialog(true)}>
                            <i className="fa fa-plus bg-pluse"></i>
                            <p className="mb-0 mr-2 ml-5 my-1">افزودن</p>
                        </button>

                        <div className="table-responsive border border-radius-09rem" >
                            <table class="table p-0 m-0">
                                <thead>
                                    <tr className="text-center">
                                        <th scope="col"> ردیف</th>
                                        <th scope="col"> نام نیازمند</th>
                                        <th scope="col"> مبلغ مورد نیاز  </th>
                                        <th scope="col">حداقل مبلغ مجاز </th>
                                        <th scope="col"> توضیحات</th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cashAssistance.map((ss, index) => (
                                        <tr className="text-center">
                                            <th scope="row">{(index + 1) + (currentPage - 1) * 10}</th>
                                            <td className="border border-bottom-0">{ss.persons.name + ' ' + ss.persons.family}</td>
                                            <td className="border border-bottom-0">{ss.neededPrice + ' ريال'}</td>
                                            <td className="border border-bottom-0">{ss.minPrice + ' ريال'}</td>
                                            <td className="border border-bottom-0">{ss.description}</td>
                                            <td className='border border-bottom-0'><img className="bg-danger rounded p-1 cursor-pointer" src={trashIcon} onClick={() => handleDeleteCash(ss.cashAssistanceDetailId)} alt="" /></td>
                                            <td className=''><img className="bg-warning rounded p-1 cursor-pointer" src={pencilIcon} onClick={() => handleEditCash(ss.cashAssistanceDetailId)} alt="" /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {cashAssistance && count > 10 ?
                            <Pagination
                                total={count}
                                currentPage={currentPage}
                                perPage={10}
                                onPageChange={(page) => setCurrentPage(page)}
                            /> : null}

                    </div>


                </DialogContent>
            </DialogOverlay> */}
        </div>
    );
}

export default HelpDetailsDialog;