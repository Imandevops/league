
import react, { useEffect, useState } from 'react';
import HttpService from '../../service/HttpService';


import { toastError } from '../../util/ToastUtil';





const Courses = () => {
    const [plan, setPlan] = useState([]);
    const [countStudy, setCountStudy] = useState(0);
    const [countIdea, setCountIdea] = useState(0);
    const [countPrimaryProduct, setCountPrimaryProduct] = useState(0);
    const [countFinalProduct, setCountFinalProduct] = useState(0);
    var counterIdea = 0;
    var counterStudy = 0;
    var counterPrimaryProduct = 0;
    var counterFinalProduct = 0;

    async function getPlans() {
        try {
            const { data, status } = await HttpService.get(`/api/league/plan`)
            if (status === 200) {
                setPlan(data)
               
                
                for (let i = 0; i < data.length; i++) 
                {                    
                    if(data[i].planNature === 'IDEA')
                    {
                        counterIdea++ ;
                       
                        
                        setCountIdea(counterIdea)
                       
                       
                    }
                    if(data[i].planNature === 'RD')
                    {
                        counterStudy++ ;
                       
                        
                        setCountStudy(counterStudy)
                       
                       
                    }
                    if(data[i].planNature === 'MVP')
                    {
                        counterPrimaryProduct++ ;
                       
                        
                        setCountPrimaryProduct(counterPrimaryProduct)
                       
                       
                    }
                    if(data[i].planNature === 'CP')
                    {
                        counterFinalProduct++ ;
                       
                        
                        setCountFinalProduct(counterFinalProduct)
                       
                       
                    }
                }
               
            }
        
        } catch (error) {
            toastError(error.response.data.message);
        }
    }



    useEffect(() => {
        getPlans()
    }, [])
    return (
        <div className='bg-course' >
            <div className='d-flex justify-content-center m-5 pt-3'>
                <p className='h3 text-dark fw-bolder'>طرح‌های ورودی</p>
            </div>
            <div className='d-flex justify-content-center row mx-4'>

                <div className=' col-12 col-md-6 col-lg-3 '>
                    <div className='d-flex justify-content-center'>
                        <div className='circle justify-content-center  align-content-center my-2'>
                            <p className='h3 text-white text-center pt-1'>{countStudy}</p>
                        </div>
                    </div>
                    <div className='btn-news'>
                        <div className='mx-auto px-5 py-3'>
                            <h6 className='text-center'> مطالعه و پژوهش</h6>
                        </div>
                    </div>
                </div>
                <div className=' col-12 col-md-6 col-lg-3'>
                    <div className='d-flex justify-content-center '>
                        <div className='circle justify-content-center align-content-center my-2'>
                            <p className='h3 text-white text-center pt-1'>{countIdea}</p>
                        </div>
                    </div>
                    <div className='btn-news'>
                        <div className='padding-idea mx-auto  py-3'>
                            <h6 className='text-center'> ایده
                            </h6>
                        </div>
                    </div>

                </div>
                <div className='col-12 col-md-6 col-lg-3'>

                    <div className='d-flex justify-content-center'>
                        <div className='circle justify-content-center align-content-center my-2'>
                            <p className='h3 text-white text-center pt-1'>{countPrimaryProduct}</p>
                        </div>
                    </div>
                    <div className='btn-news'>
                        <div className='mx-2 px-5 py-3'>
                            <h6 className='text-center'> محصول اولیه</h6>
                        </div>
                    </div>

                </div>
                <div className=' col-12 col-md-6 col-lg-3'>
                    <div className='d-flex justify-content-center'>
                        <div className='circle justify-content-center align-content-center my-2'>
                            <p className='h3 text-white text-center pt-1'>{countFinalProduct}</p>
                        </div>
                    </div>
                    <div className='btn-news px-5 py-2 d-flex flex-column justify-content-center align-items-center px-2 py-1 '>
                        {/* <p className='mb-0'> <h6> محصول نهایی </h6> </p>
                        <p className='mb-0 mt-0'> <h6>  </h6> </p> */}
                        <div className='mx-2 px-5 py-3'>
                            <h6 className='text-center'> محصول نهایی</h6>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Courses;