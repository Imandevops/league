import React, { useEffect, useState } from 'react';
import { DialogContent, DialogOverlay } from '@reach/dialog';

import HttpService from '../../service/HttpService';
import { toastError, toastSuccess, toastWarning } from '../../util/ToastUtil';
import { useHistory } from 'react-router';


const PlanUndergraduateDialog = ({ showDialog, closeDialog, planUniqueName, planName,planId }) => {

    const history = useHistory()

  

    async function handleCalculateScores() {

        let innovativeAspectsScore;
        let newTopicScore;
        let scientificValueScore;
        let explainableScore;
        let scalabilityScore;
    
        let finalScore;
        if(document.querySelector('#innovativeAspectsTa').checked)
             innovativeAspectsScore =  document.getElementById("innovativeAspectsTa").value
        else if(document.querySelector('#innovativeAspectsA').checked)
             innovativeAspectsScore =  document.getElementById("innovativeAspectsA").value
        else if(document.querySelector('#innovativeAspectsNeutral').checked)
             innovativeAspectsScore =  document.getElementById("innovativeAspectsNeutral").value
        else if(document.querySelector('#innovativeAspectsDisa').checked)
             innovativeAspectsScore =  document.getElementById("innovativeAspectsDisa").value
        else if(document.querySelector('#innovativeAspectsTdisa').checked)
             innovativeAspectsScore =  document.getElementById("innovativeAspectsTdisa").value


             
        if(document.querySelector('#newTopicTa').checked)
             newTopicScore =  document.getElementById("newTopicTa").value
        else if(document.querySelector('#newTopicA').checked)
             newTopicScore =  document.getElementById("newTopicA").value
        else if(document.querySelector('#newTopicNeutral').checked)
             newTopicScore =  document.getElementById("newTopicNeutral").value
        else if(document.querySelector('#newTopicDisa').checked)
             newTopicScore =  document.getElementById("newTopicDisa").value
        else if(document.querySelector('#newTopicTdisa').checked)
             newTopicScore =  document.getElementById("newTopicTdisa").value

        


        if(document.querySelector('#scientificValueTa').checked)
            scientificValueScore =  document.getElementById("scientificValueTa").value
        else if(document.querySelector('#scientificValueA').checked)
             scientificValueScore =  document.getElementById("scientificValueA").value
        else if(document.querySelector('#scientificValueNeutral').checked)
             scientificValueScore =  document.getElementById("scientificValueNeutral").value
        else if(document.querySelector('#scientificValueDisa').checked)
            scientificValueScore =  document.getElementById("scientificValueDisa").value
        else if(document.querySelector('#scientificValueTdisa').checked)
            scientificValueScore =  document.getElementById("scientificValueTdisa").value


        if(document.querySelector('#explainableTa').checked)
            explainableScore =  document.getElementById("explainableTa").value
        else if(document.querySelector('#explainableA').checked)
            explainableScore =  document.getElementById("explainableA").value
        else if(document.querySelector('#explainableNeutral').checked)
            explainableScore =  document.getElementById("explainableNeutral").value
        else if(document.querySelector('#explainableDisa').checked)
            explainableScore =  document.getElementById("explainableDisa").value
        else if(document.querySelector('#explainableTdisa').checked)
            explainableScore =  document.getElementById("explainableTdisa").value



        if(document.querySelector('#scalabilityTa').checked)
            scalabilityScore =  document.getElementById("scalabilityTa").value
        else if(document.querySelector('#scalabilityA').checked)
            scalabilityScore =  document.getElementById("scalabilityA").value
        else if(document.querySelector('#scalabilityNeutral').checked)
             scalabilityScore =  document.getElementById("scalabilityNeutral").value
        else if(document.querySelector('#scalabilityDisa').checked)
            scalabilityScore =  document.getElementById("scalabilityDisa").value
        else if(document.querySelector('#scalabilityTdisa').checked)
             scalabilityScore =  document.getElementById("scalabilityTdisa").value


        if(innovativeAspectsScore == null)
        {
            toastError(" امتیاز برخورداری از جنبه های نوآورانه اجباری است")
            return
        }
        if(newTopicScore == null)
        {
            toastError("امتیاز جدید بودن موضوع اجباری است")
            return
        }
        if(scientificValueScore == null)
        {
            toastError("امتیاز ارزش علمی و کاربردی اجباری است")
            return
        }
        if(explainableScore == null)
        {
            toastError("امتیاز توجیه پذیری اجباری است")
            return
        }
        if(scalabilityScore == null)
        {
            toastError("امتیاز توسعه پذیری و قابلیت تبدیل به محصول کاربردی اجباری است")
            return
        }

        finalScore =((innovativeAspectsScore * 7) + (newTopicScore * 5) + (scientificValueScore * 3)
                             + (explainableScore * 2)+ (scalabilityScore * 3)) / 20;

       
        const input = document.getElementById('finalScore');
        document.getElementById('finalScore').value = finalScore;
        if(finalScore >= 2.5)
        {
           
            
            input.style.backgroundColor = 'green';

            
        }
        else
        {
            input.style.backgroundColor = 'red';
        }
        
    }
    async function handlePlanExpertInfoRegister() {

        const innovativeAspects = document.getElementById("innovativeAspects").value;
        const newTopic = document.getElementById("newTopic").value;
        const scientificValue = document.getElementById("scientificValue").value;
        const explainable = document.getElementById("explainable").value;
        const finalScore = document.getElementById("finalScore").value;
        const finalOpinion = document.getElementById("finalOpinion").value;
        const scalability = document.getElementById("scalability").value;

        let innovativeAspectsScore;
        let newTopicScore;
        let scientificValueScore;
        let explainableScore;
        let scalabilityScore;
    
        if(document.querySelector('#innovativeAspectsTa').checked)
             innovativeAspectsScore =  document.getElementById("innovativeAspectsTa").value
        else if(document.querySelector('#innovativeAspectsA').checked)
             innovativeAspectsScore =  document.getElementById("innovativeAspectsA").value
        else if(document.querySelector('#innovativeAspectsNeutral').checked)
             innovativeAspectsScore =  document.getElementById("innovativeAspectsNeutral").value
        else if(document.querySelector('#innovativeAspectsDisa').checked)
             innovativeAspectsScore =  document.getElementById("innovativeAspectsDisa").value
        else if(document.querySelector('#innovativeAspectsTdisa').checked)
             innovativeAspectsScore =  document.getElementById("innovativeAspectsTdisa").value

        
             
        if(document.querySelector('#newTopicTa').checked)
             newTopicScore =  document.getElementById("newTopicTa").value
        else if(document.querySelector('#newTopicA').checked)
             newTopicScore =  document.getElementById("newTopicA").value
        else if(document.querySelector('#newTopicNeutral').checked)
             newTopicScore =  document.getElementById("newTopicNeutral").value
        else if(document.querySelector('#newTopicDisa').checked)
             newTopicScore =  document.getElementById("newTopicDisa").value
        else if(document.querySelector('#newTopicTdisa').checked)
             newTopicScore =  document.getElementById("newTopicTdisa").value

        


        if(document.querySelector('#scientificValueTa').checked)
            scientificValueScore =  document.getElementById("scientificValueTa").value
        else if(document.querySelector('#scientificValueA').checked)
             scientificValueScore =  document.getElementById("scientificValueA").value
        else if(document.querySelector('#scientificValueNeutral').checked)
             scientificValueScore =  document.getElementById("scientificValueNeutral").value
        else if(document.querySelector('#scientificValueDisa').checked)
            scientificValueScore =  document.getElementById("scientificValueDisa").value
        else if(document.querySelector('#scientificValueTdisa').checked)
            scientificValueScore =  document.getElementById("scientificValueTdisa").value


        if(document.querySelector('#explainableTa').checked)
            explainableScore =  document.getElementById("explainableTa").value
        else if(document.querySelector('#explainableA').checked)
            explainableScore =  document.getElementById("explainableA").value
        else if(document.querySelector('#explainableNeutral').checked)
            explainableScore =  document.getElementById("explainableNeutral").value
        else if(document.querySelector('#explainableDisa').checked)
            explainableScore =  document.getElementById("explainableDisa").value
        else if(document.querySelector('#explainableTdisa').checked)
            explainableScore =  document.getElementById("explainableTdisa").value



        if(document.querySelector('#scalabilityTa').checked)
            scalabilityScore =  document.getElementById("scalabilityTa").value
        else if(document.querySelector('#scalabilityA').checked)
            scalabilityScore =  document.getElementById("scalabilityA").value
        else if(document.querySelector('#scalabilityNeutral').checked)
             scalabilityScore =  document.getElementById("scalabilityNeutral").value
        else if(document.querySelector('#scalabilityDisa').checked)
            scalabilityScore =  document.getElementById("scalabilityDisa").value
        else if(document.querySelector('#scalabilityTdisa').checked)
             scalabilityScore =  document.getElementById("scalabilityTdisa").value

     
         let undergraduateStatus ;
         if(finalScore >3)
         {
            undergraduateStatus = 'WPJudge'
         }
         else
         {
            undergraduateStatus = 'RExpert'
         }

       
       

       
        
        const body = {
            planUniqueName, planName, innovativeAspects,innovativeAspectsScore, newTopic,newTopicScore, scientificValue,scientificValueScore,
            explainable,explainableScore,scalability,scalabilityScore,finalScore,finalOpinion
        }


   
        const PlanBody = {
            undergraduateStatus
        }

     
        try {
            const { status } = await HttpService.post('/api/league/planUndergraduate',body)
            if (status === 200) {

               const { status } = await HttpService.put(`/api/league/Plan/${planId}`,PlanBody)
                toastSuccess("طرح با موفقیت کارشناسی گردید")
                history.push('/dashbord/PlanReview')
                window.location.reload()

            }
        } catch (ex) {

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
                padding: '0px',
                borderRadius: '3px',
                boxShadow: '0px 10px 50px hsla(0, 0%, 0%, 0.33)',
                height: '880px',
                maxWidth: '1200px',
                width: '50%',
                margin: 'auto'
            }}>

                <div className='viewUserDialogeDiv'>

                <h4 className='d-flex justify-content-center mt-6' >فرم در حال ثبت کارشناسی</h4></div>
                            
                <div className='container p-4'>     
                
                                            
                    <div className='d-flex  row'>
                        <div className='col-12 col-md-4 col-lg-12'>
                            <div className='d-flex flex-column'>
                                <div className=' d-flex align-items-center justify-content-center'>     
                                    <label className=' h6 m-2 border uploadPicStyle4 pcenter'  style={{height:'30px',padding: '3px',backgroundColor:'lightcyan',textAlign:'center'}}>  شناسه طرح  </label>                            
                                    <input
                                        style={{width:'1000px',height:'30px'}}
                                        value={planUniqueName}
                                        id='planUniqueName'
                                        type="text"                                      
                                        className="uploadPicStyle border"
                                        readOnly
                                    />
                                
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className='d-flex  row'>
                        <div className='col-12 col-md-4 col-lg-12'>
                            <div className='d-flex flex-column'>
                                <div className=' d-flex align-items-center justify-content-center'>     
                                    <label className=' h6 m-2 border uploadPicStyle4 pcenter'  style={{height:'30px',padding: '3px',backgroundColor:'lightcyan',textAlign:'center'}}>  عنوان طرح  </label>                            
                                    <input
                                        style={{width:'1000px',height:'30px'}}
                                        value={planName}
                                        id='planName'
                                        type="text"                                       
                                        className="uploadPicStyle border"
                                        readOnly
                                    />
                                
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex  row'>
                        <div className='col-12 col-md-4 col-lg-12'>
                            <div className='d-flex flex-column'>
                                <div className=' d-flex align-items-center justify-content-center'>     
                                    <label className=' h6 m-2 border uploadPicStyle4 pcenter'  style={{height:'70px',padding: '15px',backgroundColor:'lightcyan',textAlign:'center'}}>   برخورداری از جنبه های نوآورانه ضریب : (7)   </label>                            
                                   
                                    <div className=' d-flex align-items-center justify-content-center'>
                                        <input type="radio" id="innovativeAspectsTa" value='5' name="innovativeAspects-group"  className='m-0 p-0' />
                                        <p class="pcenter my-0 flex-grow-1 py-1 px-1 mx-2" name='innovativeAspectsTa'> کاملا موافق</p>
                                    </div>

                                    <div className=' d-flex align-items-center justify-content-center'>
                                        <input type="radio" id="innovativeAspectsA" value='4' name="innovativeAspects-group" className='m-0 p-0' />
                                        <p class="pcenter my-0 flex-grow-1 py-1 px-1 mx-2" name='innovativeAspectsA'>موافق</p>
                                    </div>
                                    <div className=' d-flex align-items-center justify-content-center'>
                                        <input type="radio" id="innovativeAspectsNeutral" value='3' name="innovativeAspects-group" className='m-0 p-0' />
                                        <p class="pcenter my-0 flex-grow-1 py-1 px-1 mx-2" name='innovativeAspectsNeutral'>ارزش خنثی</p>
                                    </div>
                                    <div className=' d-flex align-items-center justify-content-center'>
                                        <input type="radio" id="innovativeAspectsDisa" value='2' name="innovativeAspects-group" className='m-0 p-0' />
                                        <p class="pcenter my-0 flex-grow-1 py-1 px-1 mx-2" name='innovativeAspectsDisa'>مخالف</p>
                                    </div>
                                    <div className=' d-flex align-items-center justify-content-center'>
                                        <input type="radio" id="innovativeAspectsTdisa" value='1' name="innovativeAspects-group" className='m-0 p-0' />
                                        <p class="pcenter my-0 flex-grow-1 py-1 px-1 mx-2" name='innovativeAspectsTdisa'>کاملا مخالف</p>
                                    </div>
                                
                                    <textarea
                                        style={{width:'400px',height:'70px'}}                                      
                                        id='innovativeAspects'
                                        type="text"                                       
                                        className="uploadPicStyle4 mx-2 border"                                                                                        
                                    />
                                
                                  
                                </div>
                              
                                    
                                <div className=' d-flex align-items-center justify-content-center'>     
                                    <label className=' h6 m-2 border uploadPicStyle4 pcenter'  style={{height:'70px',padding: '15px',backgroundColor:'lightcyan',textAlign:'center'}}>   جدید بودن موضوع ضریب : (5)   </label>                            

                                    <div className=' d-flex align-items-center justify-content-center'>
                                        <input type="radio" id="newTopicTa" value='5' name="newTopic-group" className='m-0 p-0' />
                                        <p class="pcenter my-0 flex-grow-1 py-1 px-1 mx-2" name='newTopicTa'>کاملا موافق</p>
                                    </div>

                                    <div className=' d-flex align-items-center justify-content-center'>
                                        <input type="radio" id="newTopicA" value='4' name="newTopic-group" className='m-0 p-0' />
                                        <p class="pcenter my-0 flex-grow-1 py-1 px-1 mx-2" name='newTopicA'>موافق</p>
                                    </div>
                                    <div className=' d-flex align-items-center justify-content-center'>
                                        <input type="radio" id="newTopicNeutral" value='3' name="newTopic-group" className='m-0 p-0' />
                                        <p class="pcenter my-0 flex-grow-1 py-1 px-1 mx-2" name='newTopicNeutral'>ارزش خنثی</p>
                                    </div>
                                    <div className=' d-flex align-items-center justify-content-center'>
                                        <input type="radio" id="newTopicDisa" value='2' name="newTopic-group" className='m-0 p-0' />
                                        <p class="pcenter my-0 flex-grow-1 py-1 px-1 mx-2" name='newTopicDisa'>مخالف</p>
                                    </div>
                                    <div className=' d-flex align-items-center justify-content-center'>
                                        <input type="radio" id="newTopicTdisa" value='1' name="newTopic-group" className='m-0 p-0' />
                                        <p class="pcenter my-0 flex-grow-1 py-1 px-1 mx-2" name='newTopicTdisa'>کاملا مخالف</p>
                                    </div>

                                    <textarea
                                            style={{width:'400px',height:'70px'}}                                           
                                            id='newTopic'
                                            type="text"                                       
                                            className="uploadPicStyle4 mx-2 border"                                                                                        
                                        />
                                  
                                </div>
                               
                                
                                <div className=' d-flex align-items-center justify-content-center'>     
                                    <label className=' h6 m-2 border uploadPicStyle4 pcenter'  style={{height:'70px',padding: '15px',backgroundColor:'lightcyan',textAlign:'center'}}>   ارزش علمی و کاربردی ضریب : (3)   </label>                            

                                    <div className=' d-flex align-items-center justify-content-center'>
                                        <input type="radio" id="scientificValueTa" value='5' name="scientificValue-group" className='m-0 p-0' />
                                        <p class="pcenter my-0 flex-grow-1 py-1 px-1 mx-2" name='scientificValueTa'>کاملا موافق</p>
                                    </div>

                                    <div className=' d-flex align-items-center justify-content-center'>
                                        <input type="radio" id="scientificValueA" value='4' name="scientificValue-group" className='m-0 p-0' />
                                        <p class="pcenter my-0 flex-grow-1 py-1 px-1 mx-2" name='scientificValueA'>موافق</p>
                                    </div>
                                    <div className=' d-flex align-items-center justify-content-center'>
                                        <input type="radio" id="scientificValueNeutral" value='3' name="scientificValue-group" className='m-0 p-0' />
                                        <p class="pcenter my-0 flex-grow-1 py-1 px-1 mx-2" name='scientificValueNeutral'>ارزش خنثی</p>
                                    </div>
                                    <div className=' d-flex align-items-center justify-content-center'>
                                        <input type="radio" id="scientificValueDisa" value='2' name="scientificValue-group" className='m-0 p-0' />
                                        <p class="pcenter my-0 flex-grow-1 py-1 px-1 mx-2" name='scientificValueDisa'>مخالف</p>
                                    </div>
                                    <div className=' d-flex align-items-center justify-content-center'>
                                        <input type="radio" id="scientificValueTdisa" value='1' name="scientificValue-group" className='m-0 p-0' />
                                        <p class="pcenter my-0 flex-grow-1 py-1 px-1 mx-2" name='scientificValueTdisa'>کاملا مخالف</p>
                                    </div>

                                    <textarea
                                            style={{width:'400px',height:'70px'}}                                
                                            id='scientificValue'
                                            type="text"                                       
                                            className="uploadPicStyle4 mx-2 border"                                                                                        
                                        />
                                  
                                </div>
                              

                                <div className=' d-flex align-items-center justify-content-center'>     
                                    <label className=' h6 m-2 border uploadPicStyle4 pcenter'  style={{height:'70px',padding: '20px',backgroundColor:'lightcyan',textAlign:'center'}}>   توجیه پذیری ضریب : (2)   </label>                            

                                    <div className=' d-flex align-items-center justify-content-center'>
                                        <input type="radio" id="explainableTa" value='5' name="explainable-group" className='m-0 p-0' />
                                        <p class="pcenter my-0 flex-grow-1 py-1 px-1 mx-2" name='explainableTa'>کاملا موافق</p>
                                    </div>

                                    <div className=' d-flex align-items-center justify-content-center'>
                                        <input type="radio" id="explainableA" value='4' name="explainable-group" className='m-0 p-0' />
                                        <p class="pcenter my-0 flex-grow-1 py-1 px-1 mx-2" name='explainableA'>موافق</p>
                                    </div>
                                    <div className=' d-flex align-items-center justify-content-center'>
                                        <input type="radio" id="explainableNeutral" value='3' name="explainable-group" className='m-0 p-0' />
                                        <p class="pcenter my-0 flex-grow-1 py-1 px-1 mx-2" name='explainableNeutral'>ارزش خنثی</p>
                                    </div>
                                    <div className=' d-flex align-items-center justify-content-center'>
                                        <input type="radio" id="explainableDisa" value='2' name="explainable-group" className='m-0 p-0' />
                                        <p class="pcenter my-0 flex-grow-1 py-1 px-1 mx-2" name='explainableDisa'>مخالف</p>
                                    </div>
                                    <div className=' d-flex align-items-center justify-content-center'>
                                        <input type="radio" id="explainableTdisa" value='1' name="explainable-group" className='m-0 p-0' />
                                        <p class="pcenter my-0 flex-grow-1 py-1 px-1 mx-2" name='explainableTdisa'>کاملا مخالف</p>
                                    </div>

                                    <textarea
                                            style={{width:'400px',height:'70px'}}                                
                                            id='explainable'
                                            type="text"                                       
                                            className="uploadPicStyle4 mx-2 border"                                                                                        
                                        />
                                  
                                </div>

                                <div className=' d-flex align-items-center justify-content-center'>     
                                    <label className=' h6 m-2 border uploadPicStyle4 pcenter'  style={{height:'70px',padding: '9px',backgroundColor:'lightcyan',textAlign:'center'}}>   توسعه پذیری و قابلیت تبدیل به محصول کاربردی ضریب : (3)   </label>                            

                                    <div className=' d-flex align-items-center justify-content-center'>
                                        <input type="radio" id="scalabilityTa" value='5' name="scalability-group" className='m-0 p-0' />
                                        <p class="pcenter my-0 flex-grow-1 py-1 px-1 mx-2" name='scalabilityTa'>کاملا موافق</p>
                                    </div>

                                    <div className=' d-flex align-items-center justify-content-center'>
                                        <input type="radio" id="scalabilityA" value='4' name="scalability-group" className='m-0 p-0' />
                                        <p class="pcenter my-0 flex-grow-1 py-1 px-1 mx-2" name='scalabilityA'>موافق</p>
                                    </div>
                                    <div className=' d-flex align-items-center justify-content-center'>
                                        <input type="radio" id="scalabilityNeutral" value='3' name="scalability-group" className='m-0 p-0' />
                                        <p class="pcenter my-0 flex-grow-1 py-1 px-1 mx-2" name='scalabilityNeutral'>ارزش خنثی</p>
                                    </div>
                                    <div className=' d-flex align-items-center justify-content-center'>
                                        <input type="radio" id="scalabilityDisa" value='2' name="scalability-group" className='m-0 p-0' />
                                        <p class="pcenter my-0 flex-grow-1 py-1 px-1 mx-2" name='scalabilityDisa'>مخالف</p>
                                    </div>
                                    <div className=' d-flex align-items-center justify-content-center'>
                                        <input type="radio" id="scalabilityTdisa" value='1' name="scalability-group" className='m-0 p-0' />
                                        <p class="pcenter my-0 flex-grow-1 py-1 px-1 mx-2" name='scalabilityTdisa'>کاملا مخالف</p>
                                    </div>

                                    <textarea
                                            style={{width:'400px',height:'70px'}}                                
                                            id='scalability'
                                            type="text"                                       
                                            className="uploadPicStyle4 mx-2 border"                                                                                        
                                        />
                                  
                                </div>

                                <div className=' d-flex align-items-center justify-content-center'>    

                                    <label className=' h6 m-2 border uploadPicStyle4 pcenter'  style={{height:'70px',padding: '20px',backgroundColor:'lightcyan',textAlign:'center'}}> نظر نهایی کارشناس</label>                                                               

                                    <textarea
                                            style={{width:'1000px',height:'70px'}}
                                            id='finalOpinion'
                                            type="text"                                       
                                            className="uploadPicStyle4 mx-2 border"                                                                                        
                                        />
                                  
                                </div>

                                <div className=' d-flex mt-3 '>     

                                    <button className='formbutton3  h6 m-2 border uploadPicStyle4 pcenter' onClick={handleCalculateScores} 
                                            style={{height:'70px',width:'210px',padding: '20px',backgroundColor:'lightgreen',textAlign:'center'}}>تایید امتیاز نهایی</button>                                    

                                    <div className=' d-flex align-items-center justify-content-center'>
                                        <input
                                                style={{width:'100px',height:'70px',textAlign:'center',fontWeight:'bold',fontSize:'30px',color:'blue'}}
                                                id='finalScore'
                                                type="text"                                       
                                                className="uploadPicStyle4 mx-2 border"                                               
                                                readOnly                                                                         
                                            />
                                        
                                    </div>
                              
                                  
                                </div>
                             
                                
                            </div>
                        </div>
                    </div>

          
                    <div className='d-flex justify-content-center mt-3 row'>

                    <div className=' d-flex justify-content-center col-12 col-md-6 col-lg-3'>
                        <button className='formbutton3  flex-grow-1 mx-4 outline-0 '  onClick={handlePlanExpertInfoRegister} > ثبت نهایی </button>
                    </div>
                </div>

                </div>


            </DialogContent>
        </DialogOverlay >);
}

export default PlanUndergraduateDialog;