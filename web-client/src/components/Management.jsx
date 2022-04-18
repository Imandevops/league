import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import HttpService from '../service/HttpService';
import logoheader from '../static/images/logoheader.png';
import { toastError, toastSuccess } from '../util/ToastUtil';
import { timestampToPersian } from '../util/DateUtil'


const Management = () => {

    const [plan, setPlan] = useState([])
    const history = useHistory()


    async function getPlans() {
        try {
            const { data, status } = await HttpService.get(`/api/league/plan?companyName=${localStorage.getItem('companyName')}&status=در انتظار تایید مدیر شرکت`)
            console.log(data);
            if (status === 200) {
                setPlan(data)

            }

        } catch (error) {
        }
    }


    async function handleContinue(planId) {

        let radios = document.getElementsByName(planId)
        let value
        if (radios[0].checked) {
            value = radios[0].value
        } else {
            value = radios[1].value
        }

        const body = { status: value }
        try {
            const { status } = await HttpService.put(`/api/league/plan/ceoCheck/${planId}`, body)

            if (status === 204) {
                toastSuccess("طرح با موفقیت بروز رسانی شد")
                getPlans()
            }

        } catch (error) {
            toastError(error.response.data.message);
        }
    }



    useEffect(() => {
        getPlans()
    }, [])


    return (
        <div>
            <nav className='navbar navbar-light '>
                <div className='container d-block'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div className="dropdown ">

                        </div>
                        <img className=" imgheader-size" src={logoheader} alt="" />
                    </div>
                </div>
            </nav>


            <div className='container centerclass'>

                <div className=' boxcolor1 shadow mt-5 mb-5 mx-auto'>
                    <h3 className='managementStyle d-flex justify-content-center p-2'>خوش آمدید</h3>
                </div>


                <table className="table table-striped text-center">
                    <thead>
                        <tr>
                            <th>تاریخ ثبت طرح</th>
                            <th>نام طرح</th>
                            <th>شناسه طرح</th>
                            <th>وضعیت طرح</th>
                            <th>تایید/رد</th>
                        </tr>
                    </thead>
                    <tbody>

                        {plan.length > 0 ? plan.map(item =>
                            <tr>
                                <td>{timestampToPersian(new Date(item.issuedDate).getTime())} </td>
                                <td>{item.planName} </td>
                                <td>{item.planUniqueName} </td>
                                <td> {item.status}</td>
                                <td>
                                    <div className='d-flex justify-content-center'>

                                        <div className='d-flex align-items-center justify-content-start' >
                                            <label htmlFor="accept mx-2" style={{ minWidth: "50px" }}>تایید </label>
                                            <input className=" border radiusbor mx-2 p-1" type="radio" id="accept" name={`${item.planId}`} value='2' checked={true} />
                                        </div>

                                        <div className='d-flex align-items-center justify-content-start' >
                                            <label htmlFor="reject mx-2" style={{ minWidth: "50px" }}>رد </label>
                                            <input className="border radiusbor mx-2 p-1" type="radio" id="reject" name={`${item.planId}`} value='3' />
                                        </div>
                                    </div>

                                </td>
                                <td>
                                    <button className='p-1 pe-3 ps-3 btn-outline-light text-dark ' onClick={() => handleContinue(item.planId)}> ثبت </button>
                                </td>
                            </tr>)
                            :
                            <p>اطلاعاتی جهت نمایش وجود ندارد!</p>}
                    </tbody>
                </table>


            </div>
        </div>

    );
}

export default Management;