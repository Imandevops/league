import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import HttpService from '../../service/HttpService';
import Pagination from '../common/PaginationServer.jsx';
import MainContext from '../context/MainContext';

const PlanOwners = () => {

    const { setLoadingDialog } = useContext(MainContext)
    // const [plan, setPlan] = useState([]);
    const history = useHistory();
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const [planPagination, setPlanPagination] = useState([]);


    async function getPlans() {
        setLoadingDialog(true)
        try {
            // const { data, status } = await HttpService.get('/api/league/plan?page=0')
            const planPage = await HttpService.get(`/api/league/plan/pagination?page=${currentPage - 1}`)
            if (planPage.status === 200) {
                setPlanPagination(planPage.data)
                setCount(planPage.headers['count'])
            }

        } catch (error) {
        }
        setLoadingDialog(false)
    }

    const handleContinue = (planId) => {
               
        history.push(`/dashbord/PlanView/${planId}`)

    }


    useEffect(() => {
        getPlans()
    }, [currentPage])


    return (

            <div className='container centerclass'>

                <div className=' boxcolor1 shadow mt-5 mb-5 mx-auto ' >
                    <h5 className='managementStyle d-flex justify-content-center p-2'> پروفایل صاحبان طرح</h5>
                </div>


                <table className="table  text-center">
                    <thead>
                        <tr>
                            <th> ردیف </th>
                            <th> شرکت </th>
                            <th> طرح </th>
                        
                            <th onClick={() => history.push('/dashbord/formData/sss')}>  مشاهده اطلاعات هویتی </th>
                        </tr>
                    </thead>
                    {planPagination && planPagination.length > 0 ?
                    <tbody>

                        {planPagination.map((p, index) => (
                            <tr>
                                <th> {(index + 1) + (currentPage - 1) * 10} </th>
                                <th> {p.companyNamePer} </th>
                                <th> {p.planName} </th>                             
                                <th> <i className="fa fa-eye logoPointer" aria-hidden="true" onClick={() => handleContinue(p.planId)}></i>  </th>
                            </tr>
                        ))} 
                    

                    </tbody>
                    :
                    <p className='text-end m-4'> اطلاعاتی جهت نمایش وجود ندارد!</p>}
                </table>
         

         
            {planPagination && count > 10 ?
                <Pagination
                    total={count}
                    currentPage={currentPage}
                    perPage={10}
                    onPageChange={(page) => setCurrentPage(page)}
                /> : null}


        </div>

    );
}

export default  PlanOwners;