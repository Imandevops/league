import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import MainContext from '../context/MainContext';
import step2 from '../../static/images/step2.png'
import { toastError } from '../../util/ToastUtil';
import AlertDialog from '../dialog/AlertDialog';
import PreviewPlanDialog from '../dialog/PreviewPlanDialog';
import Step3 from './Step3';

const Step2 = ({ planId }) => {

  // const [files, setFiles] = useState([])
  const [previewPlanDialog, setPreviewPlanDialog] = useState(false)
  const [alertDialog, setAlertDialog] = useState(false)
  const { createPlan, setCreatePlan, setFiles } = useContext(MainContext)
  const history = useHistory()

  function handleGoToStep1() {
    planId ? history.push(`/panelRouter/createPlan/step1/${planId}/callbackState`) : history.push('/panelRouter/createPlan/step1')
  }

  function handleGoToStep3() {

    let copy = { ...createPlan }

    const field = document.getElementById('field').value
    const level = document.getElementById('level').value
    const planNature = document.getElementById('planNature').value
    const planName = document.getElementById('planName').value
    const innovation = document.getElementById('innovation').value
    const target = document.getElementById('target').value
    const description = document.getElementById('description').value

    copy.field = field
    copy.level = level
    copy.planNature = planNature
    copy.planName = planName
    copy.innovation = innovation
    copy.target = target
    copy.description = description

    if (field === '0') {
      toastError('حوزه طرح انتخاب شود!')
      return
    }
    if (level === '0') {
      toastError('سطح طرح انتخاب شود!')
      return
    }
    if (planNature === '0') {
      toastError('ماهیت طرح انتخاب شود!')
      return
    }
    if (planName.length === 0) {
      toastError('نام طرح مشخص شود!')
      return
    }
    if (innovation.length === 0) {
      toastError('جنبه های نوآورانه طرح مشخص شود!')
      return
    }
    if (target.length === 0) {
      toastError('هدف طرح مشخص شود!')
      return
    }
    if (description.length === 0) {
      toastError('خلاصه طرح مشخص شود!')
      return
    }

    setCreatePlan(copy)

    planId ? setAlertDialog(true) : history.push('/panelRouter/createPlan/step3')

  }

  function neededToUploadFiles() {
    setAlertDialog(false)
    setPreviewPlanDialog(true)
    setFiles([])
  }

  function goToStep3() {
    setAlertDialog(false)
    history.push(`/panelRouter/createPlan/step3/${planId}`)
  }

  return (

    <div className='container'>

      {alertDialog ?
        <AlertDialog
          neededToUploadFiles={neededToUploadFiles}
          showDialog={alertDialog}
          closeDialog={goToStep3}
        /> : null}

      {previewPlanDialog ?
        <PreviewPlanDialog
          planId={planId}
          showDialog={previewPlanDialog}
          closeDialog={() => setPreviewPlanDialog(false)}
        /> : null}

      <h5 className='text-center mt-5 mb-3'>ثبت اطلاعات اثر</h5>

      <img className='my-5' src={step2} alt="" />

      <div className="d-flex flex-column border border-radius-25px">

        <button className="d-flex align-items-center admin-btn bg-persian-red text-white align-self-start mx-5 px-2 mt-4 border-0 rounded" onClick={handleGoToStep1}>
          <i className="fa fa-hand-o-right "></i>
          <p className="mb-0 me-1 border-end pe-1 me-1">مرحله قبل</p>
        </button>

        <div className="row justify-content-center align-items-center mx-4 px-3">

          <div className="col-12 col-sm-4 mt-2 px-1 d-flex justify-content-center">
            <select className="flex-grow-1 cursor-pointer p-1 border" aria-label="Default select example" id="field" name="field" defaultValue={createPlan?.field}>
              <option value='0'>حوزه</option>
              <option value='1'>فناوری‌های جدید</option>
              <option value='2'>فناوری‌های مالی (عمومی)</option>
              <option value='3'>بانکداری</option>
              <option value='4'>پرداخت</option>
            </select>
          </div>

          <div className="col-12 col-sm-4 mt-2 px-1 d-flex justify-content-center">
            <select className="flex-grow-1 cursor-pointer p-1 border" aria-label="Default select example" id="level" name="level" defaultValue={createPlan?.level}>
              <option value='0'>سطح</option>
              <option value='1'> محصول </option>
              <option value='2'>کسب و کار</option>
              <option value='3'>خدمات ارزش افزوده</option>
              <option value='4'>فرآیند</option>
            </select>
          </div>

          <div className="col-12 col-sm-4 mt-2 px-1 d-flex justify-content-center">
            <select className="flex-grow-1 cursor-pointer p-1 border" aria-label="Default select example" id="planNature" name="planNature" defaultValue={createPlan?.planNature}>
              <option value='0'>ماهیت</option>
              <option value='RD'>مطالعه و پژوهش</option>
              <option value='IDEA'>ایده</option>
              <option value='MVP'>محصول اولیه </option>
              <option value='CP'>محصول نهایی</option>
            </select>
          </div>

          <div className="col-12 mt-2 sm-0 px-1 d-flex justify-content-center">
            <input className='w-100 border p-2' placeholder='نام اثر' type="text" id='planName' defaultValue={createPlan?.planName} />
          </div>

          <div className="col-12 mt-2  px-1 d-flex justify-content-center">
            <input className='w-100 border p-2' placeholder='جنبه های نوآورانه' type="text" id='innovation' defaultValue={createPlan?.innovation} />
          </div>
          <div className="col-12 mt-2 px-1 d-flex justify-content-center">
            <input className='w-100 border p-2' placeholder='با کدام یک از اهداف معرفی شده شرکت مطابق است؟' type="text" id='target' defaultValue={createPlan?.target} />
          </div>

          <div className="col-12 mt-2 px-1 d-flex justify-content-center">
            <textarea className='w-100 border p-2 pe-2 text-justify' name="description" id="description" cols="30" rows="5" placeholder='خلاصه و دستاوردها' defaultValue={createPlan?.description}></textarea>
          </div>

        </div>
        <button className="d-flex align-items-center border-0 rounded bg-persian-blue text-white align-self-end mt-2 mx-5 px-2 mb-4" onClick={handleGoToStep3}>
          <p className="mb-0 me-1  ps-1  border-start">مرحله بعد</p>
          <i className="fa fa-hand-o-left pe-1"></i>
        </button>

      </div>

    </div >

  );
}

export default Step2;