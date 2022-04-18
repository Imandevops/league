import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import HttpService from '../../service/HttpService';
import Pagination from '../common/PaginationServer.jsx';
import MainContext from '../context/MainContext';
import PlanExpertInfoDialog from "../dialogs/PlanExpertInfoDialog";
import PlanExpertInfoCorrectionDialog from "../dialogs/PlanExpertInfoCorrectionDialog";
import PlanUndergraduateDialog from "../dialogs/PlanUndergraduateDialog";
import PlanUndergraduateCorrectionDialog from '../dialogs/PlanUndergraduateCorrectionDialog';

const PlanReview = () => {

    const { setLoadingDialog } = useContext(MainContext)
    const history = useHistory();
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const [planPagination, setPlanPagination] = useState([]);

    const [planExpertInfoShowDialog, setPlanExpertInfoShowDialog] = useState(false)
    const [planExpertInfoCorrectionDialog, setPlanExpertInfoCorrectionDialog] = useState(false)

    const [planUndergraduateDialog, setPlanUndergraduateDialog] = useState(false)
    const [planUndergraduateCorrectionDialog, setPlanUndergraduateCorrectionDialog] = useState(false)
    

    const [planId, setPlanId] = useState()

    const [id, setID] = useState()

    const [planUniqueName, setPlanUniqueName] = useState()
    
    const [planName, setPlanName] = useState()
    
    const [nameAndFamily, setNameAndFamily] = useState()
    const [specializedLevel, setSpecializedLevel] = useState()
    const [serviceLocation, setServiceLocation] = useState()


    const [innovativeAspects, setInnovativeAspects] = useState()
    const [innovativeAspectsScore, setInnovativeAspectsScore] = useState(0)
    

    const [newTopic, setNewTopic] = useState()
    const [newTopicScore, setNewTopicScore] = useState(0)
    

    const [scientificValue, setScientificValue] = useState()
    const [scientificValueScore, setScientificValueScore] = useState(0)
    
    
    const [explainable, setExplainable] = useState()
    const [explainableScore, setExplainableScore] = useState(0)
   

    const [scalability, setScalability] = useState()
    const [scalabilityScore, setScalabilityScore] = useState(0)
    

    const [finalScore, setFinalScore] = useState()
    const [finalOpinion, setFinalOpinion] = useState()


    async function getPlans() {
        setLoadingDialog(true)
        try {
            const planPage = await HttpService.get(`/api/league/plan/pagination?page=${currentPage - 1}`)
            
            if (planPage.status === 200) {
                setPlanPagination(planPage.data)
                setCount(planPage.headers['count'])
               
                for(let i=0 ; i < planPage.data.length ; i++)
                {                 
                    document.getElementById(`undergraduateStatus${i}`).value = planPage.data[i].undergraduateStatus;                                   
                }                                        
            }

          

        } catch (error) {
        }
        setLoadingDialog(false)
    }

   
    async function handleContinue(planUniqueName,planName,undergraduateStatus,planId) {
       
               
        if(undergraduateStatus == 'WExpert')
        {        
            const result = await HttpService.get(`/api/league/PlanExpertInfo/${planUniqueName}`)
            if(result.data.length > 0)
            {    
                setPlanUniqueName(planUniqueName)
                setPlanName(planName)
                setID(result.data[0].id)
                setNameAndFamily(result.data[0].nameAndFamily)
                setSpecializedLevel(result.data[0].specializedLevel)
                setServiceLocation(result.data[0].serviceLocation)

                                
                setPlanId(planId)          

                setPlanExpertInfoCorrectionDialog(true)                 
            }
            else{
                setPlanUniqueName(planUniqueName)
                setPlanName(planName)

                setPlanId(planId)         

                setPlanExpertInfoShowDialog(true)                  
            }
        }
        else if(undergraduateStatus == 'UExpert' || undergraduateStatus == 'RExpert')
        {     
            
            const resultPlanUndergraduate = await HttpService.get(`/api/league/planUndergraduate/${planUniqueName}`)


            if(resultPlanUndergraduate.data.length > 0)
            {    
                setPlanUniqueName(planUniqueName)
                setPlanName(planName)
                setID(resultPlanUndergraduate.data[0].id)
                setInnovativeAspects(resultPlanUndergraduate.data[0].innovativeAspects)

                setNewTopic(resultPlanUndergraduate.data[0].newTopic)

                setScientificValue(resultPlanUndergraduate.data[0].scientificValue)
                
                setExplainable(resultPlanUndergraduate.data[0].explainable)
                
                setScalability(resultPlanUndergraduate.data[0].scalability)
               
                setFinalScore(resultPlanUndergraduate.data[0].finalScore)
                setFinalOpinion(resultPlanUndergraduate.data[0].finalOpinion)
                setInnovativeAspectsScore(resultPlanUndergraduate.data[0].innovativeAspectsScore)
                setNewTopicScore(resultPlanUndergraduate.data[0].newTopicScore)
                setScientificValueScore(resultPlanUndergraduate.data[0].scientificValueScore)
                setExplainableScore(resultPlanUndergraduate.data[0].explainableScore)
                setScalabilityScore(resultPlanUndergraduate.data[0].scalabilityScore)
                
                                            
               
                setPlanId(planId)       
                setPlanUndergraduateCorrectionDialog(true)     
            }
            else{ 
                setPlanUniqueName(planUniqueName)
                setPlanName(planName)

                setPlanId(planId)     

                setPlanUndergraduateDialog(true)                
            }
        }
   
   
    }


    useEffect(() => {
        getPlans()
    }, [currentPage])


    return (
   

            <div className='container centerclass'>

        {planExpertInfoShowDialog ?
                <PlanExpertInfoDialog
                planId ={planId}
                planUniqueName={planUniqueName}
                planName={planName}
                nameAndFamily={nameAndFamily}
                specializedLevel={specializedLevel}          
                serviceLocation={serviceLocation}
                showDialog={planExpertInfoShowDialog}
                closeDialog={() => setPlanExpertInfoShowDialog(false)}
                /> : null}

        {planExpertInfoCorrectionDialog ?
                <PlanExpertInfoCorrectionDialog
                id = {id}
                planUniqueName={planUniqueName}
                planName={planName}
                nameAndFamily={nameAndFamily}
                specializedLevel={specializedLevel}          
                serviceLocation={serviceLocation}
                showDialog={PlanExpertInfoCorrectionDialog}
                closeDialog={() => setPlanExpertInfoCorrectionDialog(false)}
                /> : null}

        {planUndergraduateDialog ?
                <PlanUndergraduateDialog
                planId ={planId}
                planUniqueName={planUniqueName}
                planName={planName}
             
                showDialog={planUndergraduateDialog}
                closeDialog={() => setPlanUndergraduateDialog(false)}
                /> : null}

        {planUndergraduateCorrectionDialog ?
                <PlanUndergraduateCorrectionDialog
                id = {id}
                planId ={planId}
                planUniqueName={planUniqueName}
                planName={planName}
                innovativeAspects={innovativeAspects}
                innovativeAspectsScore={innovativeAspectsScore}
                newTopic={newTopic}
                newTopicScore={newTopicScore}
                scientificValue={scientificValue}
                scientificValueScore={scientificValueScore}
                explainable={explainable}
                explainableScore={explainableScore}
                scalability={scalability}
                scalabilityScore={scalabilityScore}
                finalScore={finalScore}
                finalOpinion={finalOpinion}
             
                showDialog={planUndergraduateCorrectionDialog}
                closeDialog={() => setPlanUndergraduateCorrectionDialog(false)}
                /> : null}                


                <div className=' boxcolor1 shadow mt-5 mb-5 mx-auto ' >
                    <h5 className='managementStyle d-flex justify-content-center p-2'> طرح‌های موجود </h5>
                </div>


                <table className="table  text-center">
                    <thead>
                        <tr>
                            <th> ردیف </th>
                            <th> شرکت </th>
                            <th> طرح </th>
                            <th>شناسه طرح</th>
                            <th>بررسی و تایید طرح</th>
                            <th></th>
                            <th>وضعیت کارشناسی / داوری</th>
                            {/* <th onClick={() => history.push('/dashbord/formData/sss')}>  وضعیت اجرایی در لیگ </th> */}
                            <th></th>
                        </tr>
                    </thead>
                    {planPagination && planPagination.length > 0 ?
                    <tbody>

                        {planPagination.map((p, index) => (
                            <tr>
                                <th> {(index + 1) + (currentPage - 1) * 10} </th>
                                <th> {p.companyNamePer} </th>
                                <th> {p.planName} </th>
                                <th> {p.planUniqueName} </th>
                                <th> {p.status} </th>     
                                <th> <i className="fa fa-eye logoPointer" aria-hidden="true" onClick={() => history.push(`/dashbord/formData/${p.planId}`)}></i>  </th>                 
                                <th> <select className="select pcenter my-0 flex-grow-1 py-2 px-1 mx-0 outline-none" id={`undergraduateStatus${index}`} 
                                        onChange={() => p.undergraduateStatus = document.getElementById(`undergraduateStatus${index}`).value } defaultValue={p.undergraduateStatus}>

                                            <option className='outline-none border-0 bg-gray' selected value="1" disabled>وضعیت کارشناسی</option>
                                            <option className='outline-none border-0 ' value="WExpert">در انتظار کارشناسی</option>
                                            <option className='outline-none border-0 ' value="UExpert">در حال کارشناسی</option>
                                            <option className='outline-none border-0 ' value="RExpert"> رد کارشناسی</option>

                                            <option className='outline-none border-0 ' value='WPJudge'>در انتظار داوری مقدماتی</option>
                                            <option className='outline-none border-0 ' value='RJudge'>رد داوری مقدماتی</option>
                                            
                                            {/* <option className='outline-none border-0 ' value='UPJudge'>در حال داوری مقدماتی</option> */}
                                            <option className='outline-none border-0 ' value='WFJudge'>در انتظار داوری نهایی</option>
                                            {/* <option className='outline-none border-0 ' value='UFJudge'>در حال داوری نهایی</option> */}
                                        </select> </th>
                                
                                <th> <i className="fa fa-eye logoPointer" aria-hidden="true" onClick={() => handleContinue(p.planUniqueName,p.planName,p.undergraduateStatus,p.planId)}></i>  </th>
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

export default PlanReview;