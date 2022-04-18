import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import HttpService from '../../service/HttpService';
import { toastSuccess } from '../../util/ToastUtil';
import PlanCorrectionDialogs from '../dialogs/PlanCorrectionDialogs';
import MainContext from '../context/MainContext';



const FormData = ({ planId }) => {


    const { setLoadingDialog } = useContext(MainContext)
    const history = useHistory()

    const [planCorrectionDialogs, setPlanCorrectionDialogs] = useState(false);
    const [plan, setPlan] = useState({})
    const [dialogBody, setDialogeBody] = useState({})
    const [falseCheckboxes, SetFalseCheckboxes] = useState([])

    const [accept, setAccept] = useState(false)
    const [checkBoxes, setCheckBoxes] = useState({
        c1: false,
        c2: false,
        c3: false,
        c4: false,
        c5: false,
        c6: false,
        c7: false,
        c8: false,
        c9: false,
        c10: false,
        c11: false,
        c12: false,
        c13: false,
    })

    const handleChange = (e) => {


        let newState = {
            ...checkBoxes,
            [e.target.id]: e.target.checked
        }

        let flag = true;
        for (let [key, value] of Object.entries(newState)) {
            if (!value) {
                flag = false
                break;
            }
        }


        setCheckBoxes(newState)
        setAccept(flag)
    }

    async function success() {

        let identityConfirmation = checkBoxes.c1 && checkBoxes.c2 && checkBoxes.c3 && checkBoxes.c4 && checkBoxes.c5
        let groupingConfirmation = checkBoxes.c6 && checkBoxes.c7 && checkBoxes.c8 && checkBoxes.c9 && checkBoxes.c10 && checkBoxes.c11
        let documentsConfirmation = checkBoxes.c12 && checkBoxes.c13


        const body = { identityConfirmation, groupingConfirmation, documentsConfirmation }

        try {
            const { status } = await HttpService.put(`/api/league/plan/adminCheck/${planId}`, body)

            if (status === 200) {
                toastSuccess("طرح با موفقیت بروز رسانی شد")
                history.push('/dashbord/planReview')
            }

        } catch (error) {

        }
    }


    async function Correction() {
        setPlanCorrectionDialogs(true)
        const uncheckboxes = []

        let identityConfirmation = (checkBoxes.c1 && checkBoxes.c2 && checkBoxes.c3 && checkBoxes.c4 && checkBoxes.c5)
        let groupingConfirmation = (checkBoxes.c6 && checkBoxes.c7 && checkBoxes.c8 && checkBoxes.c9 && checkBoxes.c10 && checkBoxes.c11)
        let documentsConfirmation = (checkBoxes.c12 && checkBoxes.c13)

        const body = { identityConfirmation, groupingConfirmation, documentsConfirmation }


        for (let [key, value] of Object.entries(checkBoxes)) {
            if (!value) {
                let name = ""
                if (key === "c1") {
                    name = "نام شرکت"
                } else if (key === "c2") {
                    name = "نام طرح"
                } else if (key === "c3") {
                    name = "شناسه طرح"
                } else if (key === "c4") {
                    name = 'نام و نام خانوادگی نماینده شرکت'
                } else if (key === "c5") {
                    name = 'نام و نام خانوادگی  صاحب اثر'
                } else if (key === "c6") {
                    name = 'حوزه طرح'
                } else if (key === "c7") {
                    name = 'سطح طرح'
                } else if (key === "c8") {
                    name = 'ماهیت طرح'
                } else if (key === "c9") {
                    name = 'جنبه‌های نوآورانه'
                } else if (key === "c10") {
                    name = 'با کدام یک از اهداف معرفی شده شرکت مطابق است؟'
                } else if (key === "c11") {
                    name = 'خلاصه و دستاوردها'
                } else if (key === "c12") {
                    name = 'پیوست های الزامی بارگزاری شده با امکان دانلود'
                } else {
                    name = 'پیوست های تکمیلی بارگزاری شده با امکان دانلود'
                }
                uncheckboxes.push({ key, name })
            }
        }
        setDialogeBody(body)
        SetFalseCheckboxes(uncheckboxes)


        try {
            const { status } = await HttpService.put(`/api/league/plan/adminCheck/${planId}`, body)
            if (status === 200) {
                for (let [key, value] of Object.entries(checkBoxes)) {
                    if (!value) {
                        const g = document.getElementsByName(key)
                    }
                }
            }
        } catch (error) { }
    }


    async function getPlan() {

        setLoadingDialog(true)
        try {
            const { data, status } = await HttpService.get(`/api/league/plan/${planId}`)
            console.log('kkkkkkkkkkk',data);
            const files = []
            if (status === 200) {
                if (data.files.length > 0) {
                    for (let file of data.files) {
                        const { data: dataHref } = await HttpService.get(`/api/league/plan/file?planUniqueName=${data?.planUniqueName}&fileName=${file}`)
                        const buffer = Buffer(dataHref.data);
                        const blob = new Blob([buffer.buffer], { type: dataHref.type });
                        const url = URL.createObjectURL(blob);

                        files.push({ fileName: file, filePath: url })
                    }
                }
            }

            data.hrefs = files
            setPlan(data);
        } catch (error) { }
        setLoadingDialog(false)
    }

    useEffect(() => {
        getPlan()
    }, [])



    return (

        <div className='container '>

            {planCorrectionDialogs ?
                <PlanCorrectionDialogs
                    planId={planId}
                    dialogBody={dialogBody}
                    falseCheckboxes={falseCheckboxes}
                    showDialog={planCorrectionDialogs}
                    closeDialog={() => setPlanCorrectionDialogs(false)}
                /> : null}

            <div onChange={handleChange} >

                <div className="d-flex flex-column mt-4 mb-4 p-4 border" style={{borderRadius:'10px'}}>

                    <h5 className='d-flex justify-content-center hborder  mt-3'>فرم ارسال طرح </h5>

                    <div className='d-flex justify-content-between mt-4 row'>

                        <div className='col-12 col-md-4 col-lg-4'>

                            <div className='d-flex flex-column'>
                                <p class="text-right h6 my-0">نام شرکت </p>
                                <div className=' d-flex align-items-center justify-content-center'>
                                    <input type="checkbox" id="c1" name="c-group" className='m-0 p-0' />
                                    <p class="pcenter my-0 flex-grow-1 py-1 px-1 mx-2" name='c1'>{plan.companyNamePer}  </p>
                                </div>
                            </div>
                        </div>

                        <div className='col-12 col-md-4 col-lg-4'>
                            <div className='d-flex flex-column'>
                                <p class="text-right h6 my-0">نام طرح </p>
                                <div className=' d-flex align-items-center justify-content-center'>
                                    <input type="checkbox" id="c2" name="c-group" className='m-0 p-0' />
                                    <p class="pcenter my-0 flex-grow-1 py-1 px-1 mx-2" name='c2'>{plan.planName}  </p>
                                </div>
                            </div>
                        </div>

                        <div className='col-12 col-md-4 col-lg-4'>
                            <div className='d-flex flex-column'>
                                <p class="text-right h6 my-0">شناسه طرح </p>
                                <div className=' d-flex align-items-center justify-content-center'>
                                    <input type="checkbox" id="c3" name="c-group" className='m-0 p-0' />
                                    <p class="pcenter my-0 flex-grow-1 py-1 px-1 mx-2" name='c3'>{plan.planUniqueName} </p>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className='d-flex justify-content-center mt-4 row'>
                        <div className='col-12 col-md-6 '>
                            <div className='d-flex flex-column'>
                                <p class="text-right h6 my-0">نام و نام خانوادگی نماینده شرکت </p>
                                <div className=' d-flex align-items-center justify-content-center'>
                                    <input type="checkbox" id="c4" name="c-group" className='m-0 p-0' />
                                    <p class="pcenter my-0 flex-grow-1 py-1 px-1 mx-2" name='c4'>{plan.companyEnvoy}  </p>
                                </div>
                            </div>
                        </div>

                        <div className='col-12 col-md-6 '>
                            <div className='d-flex flex-column'>
                                <p class="text-right h6 my-0">نام و نام خانوادگی  صاحب اثر </p>
                                <div className=' d-flex align-items-center justify-content-center'>
                                    <input type="checkbox" id="c5" name="c-group" className='m-0 p-0' />
                                    <p class="pcenter my-0 flex-grow-1 py-1 px-1 mx-2" name='c5'> {plan?.authors?.length > 0 ? plan?.authors.map((p, index) => (
                                        <p className='d-inline mx-2'  > {p.name} </p>
                                    )) : null}

                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className='d-flex justify-content-between mt-4 row'>
                        <div className='col-12 col-md-6 col-lg-4'>
                            <div className='d-flex flex-column'>
                                <p class="text-right h6 my-0">حوزه طرح  </p>
                                <div className=' d-flex align-items-center justify-content-center'>
                                    <input type="checkbox" id="c6" name="c-group" className='m-0 p-0' />
                                    <p class="pcenter my-0 flex-grow-1 py-1 px-1 mx-2" name='c6'> {plan.fieldName}  </p>
                                </div>
                            </div>
                        </div>

                        <div className='col-12 col-md-6 col-lg-4'>
                            <div className='d-flex flex-column'>
                                <p class="text-right h6 my-0"> سطح طرح </p>
                                <div className=' d-flex align-items-center justify-content-center'>
                                    <input type="checkbox" id="c7" name="c-group" className='m-0 p-0' />
                                    <p class="pcenter my-0 flex-grow-1 py-1 px-1 mx-2" name='c7'> {plan.levelName}  </p>
                                </div>
                            </div>
                        </div>

                        <div className='col-12 col-md-6 col-lg-4'>
                            <div className='d-flex flex-column'>
                                <p class="text-right h6 my-0">ماهیت طرح</p>
                                <div className=' d-flex align-items-center justify-content-center'>
                                    <input type="checkbox" id="c8" name="c-group" className='m-0 p-0' />
                                    <p class="pcenter my-0 flex-grow-1 py-1 px-1 mx-2" name='c8'>{plan.planNatureName}   </p>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className='d-flex justify-content-between mt-4 row'>
                        <div className='col-12 col-md-12 col-lg-12'>
                            <div className='d-flex flex-column'>
                                <p class="text-right h6 my-0">جنبه‌های نوآورانه </p>
                                <div className=' d-flex align-items-center justify-content-center'>
                                    <input type="checkbox" id="c9" name="c-group" className='m-0 p-0' />
                                    <p class="pcenter my-0 flex-grow-1 py-1 px-1 mx-2" name='c9'> {plan.innovation}  </p>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className='d-flex justify-content-between mt-4 row'>
                        <div className='col-12 col-md-12 col-lg-12'>
                            <div className='d-flex flex-column'>
                                <p class="text-right h6 my-0">    "با کدام یک از اهداف معرفی شده شرکت مطابق است؟" </p>
                                <div className=' d-flex align-items-center justify-content-center'>
                                    <input type="checkbox" id="c10" name="c-group" className='m-0 p-0' />
                                    <p class="pcenter my-0 flex-grow-1 py-1 px-1 mx-2" name='c10'> {plan.target} </p>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className='d-flex justify-content-between mt-4 row'>
                        <div className='col-12 col-md-12 col-lg-12'>
                            <div className='d-flex flex-column'>
                                <p class="text-right h6 my-0">  خلاصه و دستاوردها </p>
                                <div className=' d-flex align-items-center justify-content-center'>
                                    <input type="checkbox" id="c11" name="c-group" className='m-0 p-0' />
                                    <p class="pcenter my-0 flex-grow-1 py-1 px-1 mx-2" name='c11'> {plan.description} </p>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className='d-flex justify-content-center mt-4 row'>
                        <div className='col-12 col-md-6 '>
                            <div className='d-flex flex-column'>
                                {/* <p class="text-right h6 my-0">پیوست های الزامی بارگزاری شده با امکان دانلود </p> */}
                                <div className=' d-flex align-items-center justify-content-center'>
                                    <input type="checkbox" id="c12" name="c-group" className='m-0 p-0' />
                                    <p class="pcenter my-0 flex-grow-1 py-1 px-1 mx-2" name='c12'> پیوست های الزامی بارگزاری شده با امکان دانلود </p>
                                </div>
                            </div>
                        </div>

                        <div className='col-12 col-md-6 '>
                            <div className='d-flex flex-column'>
                                {/* <p class="text-right h6 my-0">پیوست های تکمیلی بارگزاری شده با امکان دانلود </p> */}
                                <div className=' d-flex align-items-center justify-content-center'>
                                    <input type="checkbox" id="c13" name="c-group" className='m-0 p-0' />
                                    <p class="pcenter my-0 flex-grow-1 py-1 px-1 mx-2" name='c13'> پیوست های تکمیلی بارگزاری شده با امکان دانلود </p>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className='d-flex justify-content-between mt-4 row'>
                        <div className='col-12 col-md-12 col-lg-12'>
                            <div className='d-flex  '>

                                <p class="pcenter my-0 flex-grow-1 px-3 py-4 mx-2" name='c12'>
                                    {plan?.hrefs?.map((p, index) => (
                                        <a href={p.filePath} className='btn-blue mx-1 d-inline-block mt-2 ' download> <i class="fa fa-download ms-2 mt-2 pb-0 mb-0" aria-hidden="true"></i> {p.fileName}</a>
                                    ))}</p>
                            </div>
                        </div>
                    </div>



                    <div className='d-flex justify-content-between mt-5 row' >

                        <div className=' d-flex justify-content-center col-12 col-md-6 col-lg-3'>
                            <button className='formbutton   ' style={{width:'150px'}} >مشاهده پیوست ها</button>
                        </div>

                        <div className='d-flex justify-content-center col-12 col-md-6 col-lg-3'>
                            <button className='formbutton  ' style={{width:'150px'}} >دانلود پیوست ها</button>
                        </div>

                        <div className='d-flex justify-content-center col-12 col-md-6 col-lg-3'>
                            <button className={`${accept ? "formbutton2" : "formbutton2-disable"} `} style={{width:'150px'}} disabled={!accept} onClick={success} >تایید و ثبت اثر</button>
                        </div>

                        <div className='d-flex justify-content-center col-12 col-md-6 col-lg-3'>
                            <button className='formbutton ' style={{width:'150px'}} onClick={Correction}  >اصلاح اثر</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    );
}

export default FormData;