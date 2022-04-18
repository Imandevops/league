import React, { useContext, useEffect, useState } from 'react';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import HttpService from '../../service/HttpService';
import { toastSuccess } from '../../util/ToastUtil';
import MainContext from '../context/MainContext';
import { useHistory } from 'react-router';

const PreviewPlanDialog = ({ showDialog, closeDialog, planId, state }) => {


    const { createPlan, files, setFiles } = useContext(MainContext)
    const history = useHistory()
    async function handleCreateOrUpdatePlan() {

        const data1 = new FormData();

        if (!planId) {
            try {
                data1.append('body', JSON.stringify(createPlan))
                for (let file of files) {
                    data1.append('pic', file.file)
                }
                const { status } = await HttpService.post(`/api/league/plan`, data1, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });

                if (status === 200) {
                    toastSuccess("طرح با موفقیت ثبت گردید");
                    history.push('/panelRouter/panel')
                    setTimeout(() => {
                        window.location.reload()
                    }, 3500)
                }
            } catch (error) {

                if (error.response.data.message === 'فایل ارسالی نامعتبر است') {
                    setFiles([])
                }

            }
        } else {

            try {

                if (files.length > 0) {

                    const copy = { ...createPlan }
                    delete copy.hrefs

                    data1.append('body', JSON.stringify(copy))
                    for (let file of files) {
                        data1.append('pic', file.file)
                    }

                    const { status } = await HttpService.put(`/api/league/plan/${planId}`, data1, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    });

                    if (status === 204) {
                        history.push('/panelRouter/panel')
                        toastSuccess("طرح با موفقیت ویرایش گردید");
                        setTimeout(() => {
                            window.location.reload()
                        }, 3500)
                    }

                } else {
                    delete createPlan.hrefs
                    const { status } = await HttpService.put(`/api/league/plan/${planId}`, createPlan);
                    if (status === 204) {
                        toastSuccess("طرح با موفقیت ویرایش گردید!");
                        history.push('/panelRouter/panel')
                        setTimeout(() => {
                            window.location.reload()
                        }, 3500)
                    }
                }
            } catch (error) {

                if (error.response.data.message === 'فایل ارسالی نامعتبر است') {
                    setFiles([])
                }

            }
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
                borderRadius: '10px',
                boxShadow: '0px 10px 50px hsla(0, 0%, 0%, 0.33)',
                height: 'unset',
                maxWidth: '1200px',
                width: '50%',
                margin: 'auto'
            }}>
                <div className='bgc-header mb-1 rounded-3'>
                    <span className='p-2 d-inline-block'><strong>نام اثر </strong><i className="fa fa-angle-double-left text-success" aria-hidden="true"></i> {createPlan.planName}</span>
                </div>

                <div className='bgc-header mb-1 rounded-3'>
                    <span className='p-2 d-inline-block'><strong>نماینده شرکت</strong> <i className="fa fa-angle-double-left text-success" aria-hidden="true"></i> {createPlan.companyEnvoy}</span>
                </div>

                <div className='bgc-header mb-1 rounded-3'>
                    <span className='p-2 d-inline-block'> <strong>صاحب اثر</strong> <i className="fa fa-angle-double-left text-success" aria-hidden="true"></i> {createPlan?.authors?.length > 0 ? createPlan?.authors.map((p, index) => (
                        <span className={`mt-1 border-success px-1 ${index != createPlan?.authors?.length - 1 ? 'border-start' : ''}`}>{p.name}</span>
                    )) : null}</span>
                    <br />
                </div>

                <div className='d-flex  justify-content-end'>
                    <button className='btn bg-persian-blue mt-2 text-white' onClick={handleCreateOrUpdatePlan}>ثبت نهایی</button>
                </div>

            </DialogContent>
        </DialogOverlay>);
}

export default PreviewPlanDialog;