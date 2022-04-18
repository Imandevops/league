import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import HttpService from '../../service/HttpService';
import step3 from '../../static/images/step3.png'
import MainContext from '../context/MainContext';
import PreviewPlanDialog from '../dialog/PreviewPlanDialog';

const Step3 = ({ planId }) => {

  const [previewPlanDialog, setPreviewPlanDialog] = useState(false)
  // const [file, setFile] = useState({})
  const { createPlan, setCreatePlan, files, setFiles, setLoadingDialog } = useContext(MainContext)
  const { planNature: natureState } = createPlan
  const history = useHistory()

  function handleGoToPreview() {
    // setFiles([...files, file])
    setPreviewPlanDialog(true)
  }

  async function handleCreateHrefs() {
    setLoadingDialog(true)
    const copyCreatePlan = { ...createPlan }
    const files1 = []
    try {
      for (let file of files) {

        const { data: dataHref } = await HttpService.get(`/api/league/plan/file?planUniqueName=${localStorage.getItem('planUniqueName')}&fileName=${file}`)
        const buffer = Buffer(dataHref.data);
        const blob = new Blob([buffer.buffer], { type: dataHref.type });
        const url = URL.createObjectURL(blob);
        files1.push({ fileName: file, filePath: url })

      }
      copyCreatePlan.hrefs = files1
      setCreatePlan(copyCreatePlan)
      setLoadingDialog(false)

    } catch (error) { console.log(error); }

  }


  const handleUploadEquipmentFile = async (e, id) => {
    if (e.target.files[0]) {
      // setFile({id, file: e.target.files[0] })
      setFiles([...files, { id, file: e.target.files[0] }])
      document.getElementById(id).innerHTML = ` (${e.target.files[0].name})`;
    }
  };

  function goToStep2() {
    planId ? history.push(`/panelRouter/createPlan/step2/${planId}`) : history.push('/panelRouter/createPlan/step2')
  }

  useEffect(() => {
    if (planId) {
      handleCreateHrefs()
    }
  }, [])

  return (

    <div className='container'>

      {previewPlanDialog ?
        <PreviewPlanDialog
          planId={planId}
          showDialog={setPreviewPlanDialog}
          closeDialog={() => setPreviewPlanDialog(false)}
        /> : null}

      <h5 className='text-center mt-5 mb-3'>بارگزاری اسناد</h5>

      <img className='my-5' src={step3} alt="" />

      <div className="d-flex flex-column alert alert-danger border-radius-25px">

        {planId ?
          <div className="d-flex align-items-center mb-1">
            <i className="fa fa-exclamation-circle text-danger fs-5" aria-hidden="true"></i>
            <span className="text-center mb-0 me-1 text-center">لطفا تمامی پیوست‌ها مجددا بارگذاری شوند.</span>
          </div>
          : null}

        <div className='d-flex align-items-center mb-1'>
          <i className="fa fa-exclamation-circle text-danger fs-5" aria-hidden="true"></i>
          <span className="text-center mb-0 me-1 text-center">مجموع حجم پیوست‌های بارگذاری شده می‌بایست حداکثر <strong>10 مگابایت</strong>  باشد.</span>
        </div>

        <div className='d-flex align-items-center mb-1'>
          <i className="fa fa-exclamation-circle text-danger fs-5" aria-hidden="true"></i>
          <span className="text-center mb-0 me-1 text-center">   از کاراکترهای خاص در نام پیوست‌ها خودداری شود.</span>
        </div>

        <div className='d-flex align-items-center mb-1'>
          <i className="fa fa-exclamation-circle text-danger fs-5" aria-hidden="true"></i>
          <span className="text-center mb-0 me-1 text-center">تایپ‌ مجاز پیوست‌ها جهت بارگذاری: <span className='text-success'> img</span> , <span className='text-success'> pdf</span> ,<span className='text-success'> word</span> ,<span className='text-success'> powerpoint</span></span>
        </div>


      </div>


      <div className="d-flex flex-column border border-radius-25px">

        <div className="col-12 col-sm-6 mt-2 mb-0 py-1 px-5 d-flex flex-column align-self-start">


          {planId ?
            <div className="d-flex flex-column align-items-end my-3">
              <div className="d-flex align-self-start align-items-center">
                <p className='mb-0'> لیست پیوست‌های بارگذاری شده قبلی</p><i className="fa fa-arrow-left me-2 text-success" aria-hidden="true"></i>
              </div>
              {createPlan?.hrefs?.map((p, index) => (
                <a href={p.filePath} className='d-inline-block text-uppercase' download>{p.fileName}</a>
              ))}
            </div>
            : null}

          {natureState == "RD" ?
            <div>
              <div className="alert alert-success mb-1 p-1">
                <strong>توجه!</strong> سند نتایج مطالعه و پژوهش را در <span className="text-danger">پیوست‌های الزامی</span> بارگزاری کنید.
              </div>
              <div className="alert alert-success mt-0 p-1">
                <strong>توجه!</strong> سند کامل مطالعه و پژوهش را در <span className="text-danger">پیوست‌های تکمیلی</span> بارگزاری کنید.
              </div>
            </div>
            :
            natureState == "IDEA" ?
              <div>
                <div className="alert alert-info mb-1 p-1">
                  <strong>توجه!</strong> سند ارائه ایده را در <span className="text-danger">پیوست‌های الزامی</span> بارگزاری کنید.
                </div>
                <div className="alert alert-success mt-0 p-1">
                  <strong>توجه!</strong> سندهای BMO و VPC را در <span className="text-danger">پیوست‌های تکمیلی</span> بارگزاری کنید.
                </div>
              </div>
              :
              natureState == "MVP" ?
                <div>
                  <div className="alert alert-info mb-1 p-1">
                    <strong>توجه!</strong> سند ارائه محصول اولیه را در <span className="text-danger">پیوست‌های الزامی</span> بارگزاری کنید.
                  </div>
                  <div className="alert alert-success mt-0 p-1">
                    <strong>توجه!</strong> سندهای BMO و VPC و Product را در <span className="text-danger">پیوست‌های تکمیلی</span> بارگزاری کنید.
                  </div>
                </div>
                :
                natureState == "CP" ?
                  <div>
                    <div className="alert alert-info mb-1 p-1">
                      <strong>توجه!</strong> سند ارائه محصول تجاری سازی شده را در <span className="text-danger">پیوست‌های الزامی</span> بارگزاری کنید.
                    </div>
                    <div className="alert alert-success mt-0 p-1">
                      <strong>توجه!</strong> سندهای BMO و VPC و Product و BP را در <span className="text-danger">پیوست‌های تکمیلی</span> بارگزاری کنید.
                    </div>
                  </div>
                  :
                  null}

        </div>

        <button className="d-flex align-items-center bg-persian-red text-white align-self-start mx-5 px-2 mt-1 border-0 rounded mb-2" onClick={goToStep2}>
          <i className="fa fa-hand-o-right "></i>
          <p className="mb-0 me-1 border-end pe-1 me-1">مرحله قبل</p>
        </button>


        <div className="row justify-content-center align-items-center mx-4 px-3">

          <div className="col-12 col-sm-6 mt-2 px-1 d-flex justify-content-center">
            <strong className='py-1 text-center w-100 border-title'>لیست پیوست‌های الزامی</strong>
          </div>

          <div className="col-12 col-sm-6 mt-2 px-1 d-flex justify-content-center">
            <strong className='py-1 text-center w-100 border-title'>لیست پیوست‌های تکمیلی</strong>
          </div>

          <div className="col-12 col-sm-6 mt-2 px-1 d-flex justify-content-center align-items-baseline ">
            <label className="d-flex align-items-baseline justify-content-center mb-0 p-2 w-100 bg-white border input-file">
              <i className="fa fa-folder-o ms-1" aria-hidden="true"></i>
              <input
                onChange={(e) => handleUploadEquipmentFile(e, 'necessaryFile1Lodead')}
                type="file"
                className="d-none border-radius-05rem-0-0-05rem cursor-pointer"
                id="necessaryFile1"
              />
              فیلد بارگزاری پیوست 1
              <p className='mb-0 me-2 text-success' id="necessaryFile1Lodead"></p>
            </label>
          </div>

          <div className="col-12 col-sm-6 mt-2 px-1 d-flex justify-content-center align-items-baseline">
            <label className="d-flex align-items-center justify-content-center mb-0 p-2 w-100 bg-white border input-file">
              <i className="fa fa-folder-o ms-1" aria-hidden="true"></i>
              <input
                onChange={(e) => handleUploadEquipmentFile(e, 'supplementaryFile1Lodead')}
                type="file"
                title="&nbsp;"
                className="d-none border-radius-05rem-0-0-05rem cursor-pointer"
                id="supplementaryFile1"
              />
              فیلد بارگزاری پیوست 1
              <p className='mb-0 me-2 text-success' id="supplementaryFile1Lodead"></p>
            </label>
          </div>

          <div className="col-12 col-sm-6 mt-2 px-1 d-flex justify-content-center align-items-baseline input-deactive">
            <label className="d-flex align-items-center justify-content-center mb-0 p-2 w-100 bg-white border ">
              <i className="fa fa-folder-o ms-1" aria-hidden="true"></i>
              <input disabled={true}
                onChange={(e) => handleUploadEquipmentFile(e, 'necessaryFile2Lodead')}
                type="file"
                title="&nbsp;"
                className="d-none border-radius-05rem-0-0-05rem "
                id="necessaryFile2"
              />
              فیلد بارگزاری پیوست 2
              <p className='mb-0 me-2 text-success' id="necessaryFile2Lodead"></p>
            </label>
          </div>
          {natureState == "RD" ?
            <div className="col-12 col-sm-6 mt-2 px-1 d-flex justify-content-center align-items-baseline input-deactive ">
              <label className="d-flex align-items-center justify-content-center mb-0 p-2 w-100 bg-white border">
                <i className="fa fa-folder-o ms-1" aria-hidden="true"></i>
                <input disabled={true}
                  onChange={(e) => handleUploadEquipmentFile(e, 'supplementaryFile2Lodead')}
                  type="file"
                  title="&nbsp;"
                  className="d-none border-radius-05rem-0-0-05rem cursor-pointer"
                  id="supplementaryFile2"
                />
                فیلد بارگزاری پیوست 2
                <p className='mb-0 me-2 text-success' id="supplementaryFile2Lodead"></p>
              </label>
            </div>
            :
            <div className="col-12 col-sm-6 mt-2 px-1 d-flex justify-content-center align-items-baseline ">
              <label className="d-flex align-items-center justify-content-center mb-0 p-2 w-100 bg-white border input-file">
                <i className="fa fa-folder-o ms-1" aria-hidden="true"></i>
                <input disabled={false}
                  onChange={(e) => handleUploadEquipmentFile(e, 'supplementaryFile2Lodead')}
                  type="file"
                  title="&nbsp;"
                  className="d-none border-radius-05rem-0-0-05rem cursor-pointer"
                  id="supplementaryFile2"
                />
                فیلد بارگزاری پیوست 2
                <p className='mb-0 me-2 text-success' id="supplementaryFile2Lodead"></p>
              </label>
            </div>
          }

          <div className="col-12 col-sm-6 mt-2 px-1 d-flex justify-content-center align-items-baseline cursor-pointer input-deactive">
            <label className="d-flex align-items-center justify-content-center mb-0 p-2 w-100 bg-white border">
              <i className="fa fa-folder-o ms-1" aria-hidden="true"></i>
              <input disabled={true}
                onChange={(e) => handleUploadEquipmentFile(e, 'necessaryFile3Lodead')}
                type="file"
                title="&nbsp;"
                className="d-none border-radius-05rem-0-0-05rem cursor-pointer"
                id="necessaryFile3"
              />
              فیلد بارگزاری پیوست 3
              <p className='mb-0 me-2 text-success' id="necessaryFile3Lodead"></p>
            </label>
          </div>

          {natureState == "RD" || natureState == "IDEA" ?
            <div className="col-12 col-sm-6 mt-2 px-1 d-flex justify-content-center align-items-baseline input-deactive">
              <label className="d-flex align-items-center justify-content-center mb-0 p-2 w-100 bg-white border">
                <i className="fa fa-folder-o ms-1" aria-hidden="true"></i>
                <input disabled={true}
                  onChange={(e) => handleUploadEquipmentFile(e, 'supplementaryFile3Lodead')}
                  type="file"
                  title="&nbsp;"
                  className="d-none border-radius-05rem-0-0-05rem cursor-pointer"
                  id="supplementaryFile3"
                />
                فیلد بارگزاری پیوست 3
                <p className='mb-0 me-2 text-success' id="supplementaryFile3Lodead"></p>
              </label>
            </div>

            :
            <div className="col-12 col-sm-6 mt-2 px-1 d-flex justify-content-center align-items-baseline">
              <label className="d-flex align-items-center justify-content-center mb-0 p-2 w-100 bg-white border input-file">
                <i className="fa fa-folder-o ms-1" aria-hidden="true"></i>
                <input
                  onChange={(e) => handleUploadEquipmentFile(e, 'supplementaryFile3Lodead')}
                  type="file"
                  title="&nbsp;"
                  className="d-none border-radius-05rem-0-0-05rem cursor-pointer"
                  id="supplementaryFile3"
                />
                فیلد بارگزاری پیوست 3
                <p className='mb-0 me-2 text-success' id="supplementaryFile3Lodead"></p>
              </label>
            </div>
          }

          <div className="col-12 col-sm-6 mt-2 px-1 d-flex justify-content-center align-items-baseline cursor-pointer input-deactive">
            <label className="d-flex align-items-center justify-content-center mb-0 p-2 w-100 bg-white border">
              <i className="fa fa-folder-o ms-1" aria-hidden="true"></i>
              <input disabled={true}
                onChange={(e) => handleUploadEquipmentFile(e, 'necessaryFile4Lodead')}
                type="file"
                title="&nbsp;"
                className="d-none border-radius-05rem-0-0-05rem cursor-pointer"
                id="supplementaryFile4"
              />
              فیلد بارگزاری پیوست 4
              <p className='mb-0 me-2 text-success' id="necessaryFile4Lodead"></p>
            </label>
          </div>


          {natureState == "RD" || natureState == "IDEA" || natureState == "MVP" ?
            <div className="col-12 col-sm-6 mt-2 px-1 d-flex justify-content-center align-items-baseline input-deactive">
              <label className="d-flex align-items-center justify-content-center mb-0 p-2 w-100 bg-white border">
                <i className="fa fa-folder-o ms-1" aria-hidden="true"></i>
                <input disabled={true}
                  onChange={(e) => handleUploadEquipmentFile(e, 'supplementaryFile4Lodead')}
                  type="file"
                  title="&nbsp;"
                  className="d-none border-radius-05rem-0-0-05rem cursor-pointer"
                  id="supplementaryFile4"
                />
                فیلد بارگزاری پیوست 4
                <p className='mb-0 me-2 text-success' id="supplementaryFile4Lodead"></p>
              </label>
            </div>
            :
            <div className="col-12 col-sm-6 mt-2 px-1 d-flex justify-content-center align-items-baseline ">
              <label className="d-flex align-items-center justify-content-center mb-0 p-2 w-100 bg-white border input-file">
                <i className="fa fa-folder-o ms-1" aria-hidden="true"></i>
                <input
                  onChange={(e) => handleUploadEquipmentFile(e, 'supplementaryFile4Lodead')}
                  type="file"
                  title="&nbsp;"
                  className="d-none border-radius-05rem-0-0-05rem cursor-pointer"
                  id="supplementaryFile4"
                />
                فیلد بارگزاری پیوست 4
                <p className='mb-0 me-2 text-success' id="supplementaryFile4Lodead"></p>
              </label>
            </div>
          }

          <button className="d-flex align-items-center border-0 rounded bg-persian-blue text-white justify-content-center mt-2 mx-5 px-0 mb-4" onClick={handleGoToPreview}>
            <i className="fa fa-check-square border-start ps-1"></i>
            <p className="mb-0 me-1"> تکمیل ثبت نام</p>
          </button>

        </div>

      </div>
    </div>

  );
}

export default Step3;