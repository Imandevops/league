import React, { useContext, useEffect, useState } from 'react';
import HttpService from '../service/HttpService';
import MainContext from './context/MainContext';
import { useHistory } from "react-router-dom";
import PlanDialog from './dialog/PlanDialog';
import { PieChart } from 'react-minimal-pie-chart';
import { toastError } from '../util/ToastUtil';
import Pagination from '../components/common/PaginationServer';
import Navbar from './common/Navbar';

const Panel = () => {

    let adminFull = localStorage.getItem('name');
    const history = useHistory();
    const [plan, setPlan] = useState([]);
    const [planInfo, setPlanInfo] = useState({});
    const [planQuery, setPlanQuery] = useState([]);
    const { profile } = useContext(MainContext);
    const [planDialog, setPlanDialog] = useState(false);
    const [planId, setPlanId] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const [planPagination, setPlanPagination] = useState([]);

    const companisName = { c1: "BSM", c2: 'BPM', c3: "SYS", c4: "YaasSie", c5: "SITS", c6: "SHGH", c7: "معاونت امنیت هلدینگ" }
    const planNature = { c1: "RD", c2: "IDEA", c3: "MVP", c4: "CP" }

    const behsazanMellat = plan.filter(b => b.abb === companisName.c1)?.length;
    const behPardakht = plan.filter(b => b.abb === companisName.c2)?.length;
    const systemyas = plan.filter(b => b.abb === companisName.c3)?.length;
    const sanayeyas = plan.filter(b => b.abb === companisName.c4)?.length;
    const zirsakht = plan.filter(b => b.abb === companisName.c5)?.length;
    const shaghayegh = plan.filter(b => b.abb === companisName.c6)?.length;

    const study = plan.filter(b => b.planNature === planNature.c1).length;
    const idea = plan.filter(b => b.planNature === planNature.c2).length;
    const primaryProduct = plan.filter(b => b.planNature === planNature.c3).length;
    const commercializedProduct = plan.filter(b => b.planNature === planNature.c4).length;

    const dataMock = [
        { title: 'One', value: behsazanMellat, color: '#D1354D' },
        { title: 'One', value: behPardakht, color: '#205EAC' },
        { title: 'One', value: systemyas, color: '#DF7382' },
        { title: 'One', value: sanayeyas, color: '#74A5E2' },
        { title: 'One', value: zirsakht, color: 'blue' },
        { title: 'One', value: shaghayegh, color: 'red' },
        // { title: 'One', value: holdingSecurity, color: '#DF7382' },

    ];

    const dataMock2 = [
        { title: 'One', value: study, color: '#D1354D' },
        { title: 'One', value: idea, color: '#205EAC' },
        { title: 'One', value: primaryProduct, color: '#DF7382' },
        { title: 'One', value: commercializedProduct, color: '#74A5E2' },
    ];

    async function handleLoadPlanDialog(plan) {
        setPlanDialog(true)
        setPlanInfo(plan)
    }

    async function getPlans() {
        try {
            const planPage = await HttpService.get(`/api/league/plan/pagination?page=${currentPage - 1}`)
            if (planPage.status === 200) {
                setPlanPagination(planPage.data)
                setCount(planPage.headers['count'])
            }
            const { data, status } = await HttpService.get(`/api/league/plan`)
            if (status === 200) {
                setPlan(data)

            }

            const planQueryRes = await HttpService.get(`/api/league/plan?companyName=${localStorage.getItem('abb')}`)
            if (planQueryRes.status === 200) {
                setPlanQuery(planQueryRes.data)
            }
        } catch (error) {
            toastError(error.response.data.message);
        }
    }



    useEffect(() => {
        getPlans()
    }, [currentPage])

    return (
        <div >
            {planDialog ?
                <PlanDialog
                    planInfo={planInfo}
                    showDialog={planDialog}
                    closeDialog={() => setPlanDialog(false)}
                /> : null}

                <Navbar/>


            <div className='d-flex justify-content-center'>
                <div className=' line-devider' />
            </div>

            <div className='container'>
                <div className='d-flex align-items-center justify-content-between mt-5'>
                    {profile.sex === true ?
                        <h5 className='mb-0'>{`  آقا/خانم ${adminFull} خوش آمدید`}</h5>
                        :
                        <h5 className='mb-0'>{`  آقا/خانم ${adminFull} خوش آمدید`}</h5>
                    }

                    <button className='btn-send  ps-4 pe-4 ms-5' onClick={() => history.push('/panelRouter/createPlan/step1')}>  ارسال طرح</button>
                </div>




                <div className='col-12 col-md-6 col-lg-12 divColor mb-0'>
                    <h6 className='text-center pie-title mt-5'>لیست طرح‌های ورودی به لیگ</h6>
                    <div className=' table-responsiv table-radius border-radius-25px d-flex justify-content-center mx-auto mb-5 bg-white p-4 shadow' >
                        <table className='table  '>
                            <thead className='table p-3 bg-white border-radius-25px m-0'>
                                <tr>
                                    <th scope="col">ردیف</th>
                                    <th scope="col">شناسه طرح</th>
                                    <th scope="col">نام شرکت</th>
                                    <th scope="col">ماهیت طرح</th>
                                </tr>
                            </thead>
                            <tbody>
                                {planPagination.length > 0 ? planPagination.map((p, index) => (


                                    <tr>
                                        <td>{(index + 1) + (currentPage - 1) * 10}</td>
                                        <td>{p.planUniqueName}</td>
                                        <td>{p.companyNamePer}</td>
                                        <td>{p.planNatureName}</td>
                                    </tr>
                                )) : <p>اطلاعاتی جهت نمایش وجود ندارد!</p>}
                            </tbody>
                        </table>
                    </div>
                </div>







                {planPagination && count > 10 ?
                    <Pagination
                        total={count}
                        currentPage={currentPage}
                        perPage={10}
                        onPageChange={(page) => setCurrentPage(page)}
                    /> : null}





                <div className='row justify-content-center mt-5 mx-auto'>
                    <div className='col-12 col-md-6 col-lg-5  mt-5 pb-2 border me-2 rounded-3'>
                        <div className='d-flex row'>
                            <h6 className='text-center pie-title mt-0 '>طرح‌های ورودی به لیگ</h6>

                            <div className='d-flex justify-content-center pieDivMargin1 pt-1 mt-0 '>
                                <PieChart className="" style={{ maxWidth: "210px" }} data={dataMock2} lineWidth={36} startAngle={250} label={(data) => data.dataEntry.value} labelPosition={82} labelStyle={{ fontSize: "10px", fontWeight: "bold", fill: "#fff" }} />
                            </div>
                            <div className="d-flex flex-wrap justify-content-center mt-4">
                                <div className="d-flex align-items-baseline mx-4"><i className="fa fa-circle" style={{ color: "#D1354D" }} aria-hidden="true"></i><p className="me-2"> مطالعه و پژوهش</p></div>
                                <div className="d-flex align-items-baseline mx-4"><i className="fa fa-circle" style={{ color: "#205EAC" }} aria-hidden="true"></i><p className="me-2">ایده </p></div>
                                <div className="d-flex align-items-baseline mx-4"><i className="fa fa-circle" style={{ color: "#DF7382" }} aria-hidden="true"></i><p className="me-2">  محصول اولیه</p></div>
                                <div className="d-flex align-items-baseline mx-4"><i className="fa fa-circle" style={{ color: "#74A5E2" }} aria-hidden="true"></i><p className="me-2"> محصول نهایی </p></div>
                            </div>
                        </div>
                    </div>


                    <div className='col-12 col-md-6 col-lg-5  mt-5 pb-2 border me-5 rounded-3'>
                        <div className='d-flex row'>
                            <h6 className='text-center pie-title mt-0 '>شرکت‌های ارائه‌دهنده طرح</h6>

                            <div className='d-flex justify-content-center pieDivMargin pt-1'>
                                <PieChart className="" style={{ maxWidth: "210px" }} data={dataMock} lineWidth={36} startAngle={250} label={(data) => data.dataEntry.value} labelPosition={82} labelStyle={{ fontSize: "10px", fontWeight: "bold", fill: "#fff" }} />

                            </div>

                            <div className="d-flex flex-wrap justify-content-center mt-4">
                                <div className="d-flex align-items-baseline mx-4"><i className="fa fa-circle" style={{ color: "#205EAC" }} aria-hidden="true"></i><p className="me-2"> به‌پرداخت</p></div>
                                <div className="d-flex align-items-baseline mx-4"><i className="fa fa-circle" style={{ color: "#D1354D" }} aria-hidden="true"></i><p className="me-2">بهسازان ملت</p></div>
                                <div className="d-flex align-items-baseline mx-4"><i className="fa fa-circle" style={{ color: "#DF7382" }} aria-hidden="true"></i><p className="me-2"> سیستم یاس</p></div>
                                <div className="d-flex align-items-baseline mx-4"><i className="fa fa-circle" style={{ color: "#74A5E2" }} aria-hidden="true"></i><p className="me-2"> صنایع یاس</p></div>
                                <div className="d-flex align-items-baseline mx-4"><i className="fa fa-circle" style={{ color: "blue" }} aria-hidden="true"></i><p className="me-2"> زیرساخت</p></div>
                                <div className="d-flex align-items-baseline mx-4"><i className="fa fa-circle" style={{ color: "red" }} aria-hidden="true"></i><p className="me-2"> شقایق</p></div>
                                {/* <div className="d-flex align-items-baseline mx-4"><i className="fa fa-circle" style={{ color: "royalblue" }} aria-hidden="true"></i><p className="me-2"> معاونت امنیت هلدینگ</p></div> */}
                            </div>
                        </div>
                    </div>

                </div>
                
                <h6 className='text-center pie-title mt-5'>لیست طرح های فعال شرکت {localStorage.getItem('companyNamePer')} </h6>
                <div className='table-responsiv table-radius border-radius-25px d-flex justify-content-center mx-auto mb-5 bg-light p-4 shadow'>
                    <table className='table p-3 bg-light border-radius-25px m-0'>
                        <thead className='p-4'>
                            <tr>
                                <th scope="col">ردیف</th>
                                <th scope="col">نام طرح</th>
                                <th scope="col"> ماهیت طرح</th>
                                <th scope="col"> وضعیت طرح</th>
                            </tr>
                        </thead>
                        <tbody>
                            {planQuery.length > 0 ? planQuery.map((p, index) => (
                                <tr className='cursor-p' onClick={() => handleLoadPlanDialog(p)}>
                                    <td>{index + 1}</td>
                                    <td>{p.planName}</td>
                                    <td>{p.planNatureName}</td>
                                    <td>{p.status}</td>
                                </tr>
                            )) : <p>اطلاعاتی جهت نمایش وجود ندارد!</p>}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
}

export default Panel;

