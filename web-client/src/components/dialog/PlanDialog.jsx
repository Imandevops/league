import React, { useContext, useEffect, useState } from 'react';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import HttpService from '../../service/HttpService';
import { toastError } from '../../util/ToastUtil';
import MainContext from '../context/MainContext';
import { useHistory } from 'react-router';

const PlanDialog = ({ showDialog, closeDialog, planInfo }) => {

    console.log(planInfo);

    const { setLoadingDialog } = useContext(MainContext)
    const history = useHistory()

    useEffect(() => {
    }, [])

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
                maxWidth: '1200px',
                width: '100%',
                margin: 'auto'
            }}>


                <table className="table table-bordered">
                    <thead className=''>
                        <tr>
                            {/* <th className='' scope="col">نویسندگان</th> */}
                            <th className='' scope="col">اسم شرکت</th>
                            <th className='' scope="col">فرستنده </th>
                            <th className='' scope="col">توضیحات</th>
                            <th className='' scope="col">نوآوری </th>
                            <th className='' scope="col">حوزه</th>
                            <th className='' scope="col">سطح</th>
                            <th className='' scope="col">نام طرح</th>
                            <th className='' scope="col">ماهیت طرح</th>
                            <th className='' scope="col">حوزه تخصصی طرح</th>
                            <th className='' scope="col">وضعیت </th>
                            <th className='' scope="col">هدف</th>
                            <th scope="col"> ویرایش طرح</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr >
                            {/* <td>
                                {planInfo?.authors?.length > 0 ? planInfo?.authors.map((item) => (
                                    <p>{item}</p>
                                )) :
                                 <p> نویسنده وجود ندارد</p>}
                            </td> */}
                            {/* <td>
                                {planInfo?.authors}

                            </td> */}
                            {/* <td>{planInfo?.authors[0].name}</td> */}

                            <td>{planInfo?.companyNamePer}</td>
                            <td>{planInfo?.companyEnvoy}</td>
                            <td className='text-justify'>{planInfo?.description}</td>
                            <td>{planInfo?.innovation}</td>
                            <td>{planInfo?.fieldName}</td>
                            <td>{planInfo?.levelName}</td>
                            <td>{planInfo?.planName}</td>
                            <td>{planInfo?.planNatureName}</td>
                            <td>{planInfo?.specializedField}</td>
                            <td>{planInfo?.status}</td>
                            <td>{planInfo?.target}</td>
                            <td><i className="fa fa-pencil-square-o fa-2x text-success cursor-p" aria-hidden="true" onClick={() => history.push(`/panelRouter/createPlan/step1/${planInfo?.planId}/noReload`)}></i></td>
                        </tr>
                    </tbody>

                </table>

            </DialogContent>
        </DialogOverlay>);
}

export default PlanDialog;