import React, { useContext, useEffect, useState } from 'react';

import { toastError, toastSuccess } from '../util/ToastUtil';
import HttpService from '../service/HttpService'
import { useHistory } from 'react-router';

import MainContext from './context/MainContext';
// import image2 from '../../static/image/image2.png';
import Header from './common/Header';

import { fixNumbers, persianToTimestamp, timestampToPersian } from '../util/DateUtil';

import DatePicker from 'react-multi-date-picker';

import { PieChart } from 'react-minimal-pie-chart';

import Chart from "react-apexcharts";




const SelectedProfileView = ({ Id }) => {

    const [selectedProfiles, setSelectedProfiles] = useState()   
    const [userImageUrl, setUserImageUrl] = useState('')   
 
   
   
    let temp = []
   
    let [row, setRow] = useState(0)

    let [study, setStudy] = useState(0)
    let [idea,  setIdea]  = useState(0)
    let [primaryProduct, setPrimaryProduct] = useState(0)
    let [finalproduct, setFinalproduct] = useState(0)

   
    let [business, setBusiness] = useState(0)
    let [product,  setProduct]  = useState(0)
    let [process, setProcess] = useState(0)
    let [valueAddedServices, setValueAddedServices] = useState(0)


    const [x, setX] = useState([{
        placeholder1: 'عنوان طرح',
        placeholder2: 'سطح',
        placeholder3: 'عنوان دوره',
        placeholder4: 'مقام(مرحله ای)',
        placeholder5: 'مقام(کلی)',
        placeholder6: 'امتیاز باشگاه نوآوران',
      }])
      
         

    const Nature = { c1: "study", c2: "idea", c3: "primary product", c4: "final product" }
    const Level = { c1: "business", c2: "product", c3: "process", c4: "value-added services" }
    
     study = x.filter(b => b.nature === Nature.c1).length;
     idea = x.filter(b => b.nature === Nature.c2).length;
     primaryProduct = x.filter(b => b.nature === Nature.c3).length;
     finalproduct = x.filter(b => b.nature === Nature.c4).length;

     business = x.filter(b => b.level === Level.c1).length;
     product = x.filter(b => b.level === Level.c2).length;
     process = x.filter(b => b.level === Level.c3).length;
     valueAddedServices = x.filter(b => b.level === Level.c4).length;


     const stateLevel = {
        options: {
          chart: {
            id: "basic-bar"
          },
          colors:['#D1354D', '#205EAC', '#DF7382','#74A5E2'],
          xaxis: {
            categories: ['کسب و کار', 'محصول', 'فرایند', 'خدمات ارزش افزوده']
          }
        },
        series: [
          {
            name: "series-1",
            data: [business, product, process, valueAddedServices]
          }
        ]
      };

 

      const stateNature = {
        options: {            
          chart: {
            id: "basic-bar"
          },         
          xaxis: {
            categories: ['ایده', 'مطالعه و پژوهش', 'محصول اولیه', ' محصول نهایی']
          }
        },
        series: [
          {
            name: "series-1",
            data: [idea, study, primaryProduct, finalproduct]
          }
        ]
      };
 
     

   

    const dataMockNature = [
        { title: 'One', value: study, color: '#D1354D' },
        { title: 'One', value: idea, color: '#205EAC' },
        { title: 'One', value: primaryProduct, color: '#DF7382' },
        { title: 'One', value: finalproduct, color: '#74A5E2' },
    ];

    const dataMockLevel = [
        { title: 'One', value: business, color: '#D1354D' },
        { title: 'One', value: product, color: '#205EAC' },
        { title: 'One', value: process, color: '#DF7382' },
        { title: 'One', value: valueAddedServices, color: '#74A5E2' },
    ];


    function handleChangeBasedOnNature() {
  
      
        idea =0
        setIdea(idea)

        study =0
        setStudy(study)

        primaryProduct =0
        setPrimaryProduct(primaryProduct)
        
        finalproduct =0
        setFinalproduct(finalproduct)

               
        for(let i = 0; i <= row ; i++)
        {           
           

            if(document.getElementById(`nature${i}`).value == "idea")
            {
               
                idea = idea + 1
                setIdea(idea)        
           
            }

            if(document.getElementById(`nature${i}`).value == "study")
            {
                 
                 study = study + 1
                 setStudy(study)

            }
                
          
               
            if(document.getElementById(`nature${i}`).value == "primary product")
            {
                
                primaryProduct = primaryProduct + 1
                setPrimaryProduct(primaryProduct)

            }
                
            if(document.getElementById(`nature${i}`).value == "final product")
            {
                
                finalproduct = finalproduct + 1
                setFinalproduct(finalproduct)
            }
                
        }
       

          
      };

      function handleChangeBasedOnLevel() {
  
  
       
        business =0
        setBusiness(business)

        product =0
        setProduct(product)

        process =0
        setProcess(process)
        
        valueAddedServices =0
        setValueAddedServices(valueAddedServices)
           
               
        for(let i = 0; i <= row ; i++)
        {           
            

            if(document.getElementById(`level${i}`).value == "business")
            {
                business = business + 1
                setBusiness(business)
                
            }

            if(document.getElementById(`level${i}`).value == "product")
            {                
                product = product + 1
                 setProduct(product)
                
            }
                
          
               
            if(document.getElementById(`level${i}`).value == "process")
            {
                process = process + 1
                setProcess(process)
            }
                
            if(document.getElementById(`level${i}`).value == "value-added services")
            {
                valueAddedServices = valueAddedServices + 1
                setValueAddedServices(valueAddedServices)
            }
                
        }

    
      };

    async function getselectedProfiles() {

        try {
            
           
            const { data, status } = await HttpService.get(`/api/league/selectedProfiles/${Id}`)

            
            if (status === 200) {
                
                data.url = []
                for (let i = 0; i < data.images.length; i++) {
                    const buffer = Buffer(data.images[i].data);
                    const blob = new Blob([buffer.buffer], { type: data.images[i].type });
                    const url = URL.createObjectURL(blob);
                    data.url.push({ fileName: data.images[i].fileName, filePath: url })


                }
                setSelectedProfiles(data)

               
  
               
                const userImage =   data?.url?.filter(p=>p.fileName.split('.')[0] === 'userImage') 
                
                setUserImageUrl(userImage[0].filePath)
               

                                                                                   
                setX(data?.designsProvidedList)
              

                for(let i=0 ; i < data.designsProvidedList.length ; i++)
                {
                 
                    document.getElementById(`nature${i}`).value = data.designsProvidedList[i].nature;
                    document.getElementById(`level${i}`).value = data.designsProvidedList[i].level;
                    document.getElementById(`courseTitle${i}`).value = data.designsProvidedList[i].courseTitle;
                   
                }   
              

               row = data.designsProvidedList.length - 1;
               setRow(row)
               
            }

        } catch (error) {
        }
    }

    const history = useHistory()

   
    


    useEffect(() => {
        getselectedProfiles()
                       
    }, [])



    const [date, setDate] = useState(new Date());

    return (
     
      
        
        <div className='container '>
             <Header />
            <div className='d-flex justify-content-center'  >
                <div className="d-flex flex-column mt-4 mb-4 p-4 border-0 border-radius-10px card1 card col-xl-11  ">

                <div className="userUpdateUpload">

                        <div className="col-12 col-sm-auto ">
                            <div className="mx-auto widthStyle" >
                                <div className="d-flex justify-content-between align-items-center rounded colorHeightStyle" >
                                                               
                                    <img src={userImageUrl} id='needyImg' alt="" />
                                                                           
                                </div>
                            </div>
                        </div>
                    
                </div>

                   
                           
                               

                    <div className='d-flex justify-content-between mt-3 row'>
                        <div className='col-12 col-md-4'>
                            <div className='d-flex flex-column'>
                                <div className=' d-flex align-items-center justify-content-center'>                                    
                                    <input class="pcenter my-0 flex-grow-1 py-2 px-1 mx-0 outline-none"  defaultValue={selectedProfiles?.name} id='name'  readOnly/>
                                </div>
                            </div>
                        </div>
                    
                        <div className='col-12 col-md-4 col-lg-4'>
                            <div className='d-flex flex-column'>
                                <div className=' d-flex align-items-center justify-content-center px-0'>
                                    <input class="pcenter my-0 flex-grow-1 py-2 px-1 mx-0 outline-none" placeholder='نام خانوادگی' defaultValue={selectedProfiles?.family} id='family' readOnly />
                                </div>
                            </div>
                        </div>
                   

                        <div className='col-12 col-md-4 '>
                            <div className='d-flex flex-column'>
                                <div className=' d-flex align-items-center justify-content-center'>
                                    <input class="pcenter my-0 flex-grow-1 py-2 px-1 mx-0 outline-none" placeholder='آخرین مدرک تحصیلی' defaultValue={selectedProfiles?.lastEducationalCertificate} id="lastEducationalCertificate" readOnly />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='d-flex justify-content-between mt-3 row'>
                            <div className='col-12 col-md-4 '>
                                <div className='d-flex flex-column'>
                                    <div className=' d-flex align-items-center justify-content-center'>                                  
                                        <select className="select pcenter my-0 flex-grow-1 py-2 px-1 mx-0 outline-none" value={selectedProfiles?.companyName} id="companyName">
                                            <option className='outline-none border-0 bg-gray' selected value="1" disabled>نام شرکت</option>
                                            <option className='outline-none border-0 ' value="BSM" disabled>بهسازان ملت</option>
                                            <option className='outline-none border-0 ' value="BPM" disabled>به پرداخت ملت</option>
                                            <option className='outline-none border-0 ' value='SYS' disabled>مهندسی سیستم یاس</option>
                                            <option className='outline-none border-0 ' value='YaasSie' disabled>مهندسی صنایع یاس ارغوانی</option>
                                            <option className='outline-none border-0 ' value='SITS' disabled>زیرساخت امن خدمات تراکنشی</option>
                                            <option className='outline-none border-0 ' value='SHGH' disabled>مهندسی نرم افزار شقایق</option>
                                        </select>
                                    </div>
                                </div>
                             </div>
                  
                             <div className='col-12 col-md-4 col-lg-4'>
                                <div className=' d-flex align-items-center justify-content-center'>
                                    <input class="pcenter my-0 flex-grow-1 py-2 px-1 mx-0 outline-none" placeholder='سمت سازمانی' defaultValue={selectedProfiles?.organizationLevel} id="organizationLevel" readOnly/>
                                </div>
                            </div>                      
                        
                   
                            <div className='col-12 col-md-4 col-lg-4'>
                            <div className='d-flex flex-column'>
                                <div className=' d-flex align-items-center justify-content-center'>                              
                                    <DatePicker
                                        value={selectedProfiles?.startDate ? timestampToPersian(new Date(selectedProfiles?.startDate).getTime()) : null}
                                        type='text'
                                        disabled
                                        locale='fa'
                                        calendar='persian'
                                        inputMode='none'
                                        inputClass='w-100 bg-input-dialog mt-0 py-2'
                                        containerClassName="w-100"
                                        placeholder="تاریخ شروع به کار "
                                        id="startDate"
                                        multiple={false} />
                                </div>
                            </div>
                        </div>
                    </div>


                 

                    <div className='d-flex justify-content-between mt-3 row'>
                     
                        <div className='col-12 col-md-4 col-lg-10'>
                            <div className='d-flex flex-column'>
                                <div className=' d-flex align-items-center justify-content-center'>
                                    <textarea rows="6" cols="10" class="pcenter my-0 flex-grow-1 py-2 px-1 mx-0 outline-none" placeholder='خلاصه ای از سوابق اجرایی ' defaultValue={selectedProfiles?.summeryExecutiveRecords} id='summeryExecutiveRecords' readOnly/>
                                
                                </div>
                            </div>
                        </div>
                       
                    </div>

                    <div className="d-flex justify-content-between align-items-center btn-send bg-persian-red text-white align-self-start mx-5 py-0 mt-4 border-0 rounded mb-2" id='addAuthor'>                        
                        <p className="mb-0 border-end border-start px-1"> لیست طرح های اضافه شده در لیگ</p>                   
                    </div>


                    <table className="widgetLgTable mt-4">
                        <tr className="widgetLgTrborder1" style={{color:'darkblue'}}>
                            <th className="widgetLgTh border  text-end"> عنوان طرح </th>
                            <th className="widgetLgTh border" style={{ paddingRight: "25px" }}>سطح </th>
                            <th className="widgetLgTh border">ماهیت </th>
                            <th className="widgetLgTh border">عنوان دوره </th>
                            <th className="widgetLgTh border">مقام (مرحله ای) </th>
                            <th className="widgetLgTh border">مقام (کلی) </th>
                            <th className="widgetLgTh border">آمتیاز باشگاه نوآوران </th>
                        </tr>
                        {x && x.length>0 ?
                        <>
                        {x?.map((b, index) => (
                            <tr className="widgetLgTrborder pb-5">
                        
                                <td className="widgetLgTd border mb-2" style={{ width: '280px' }}>
                                    <input className='pcenter2  p-2' placeholder={b.placeholder1} type="text" size={26} id={`name${index}`} defaultValue={b.name} readOnly/> 
                                </td>

                                <td className="widgetLgTd border mb-2" style={{ width: '280px' }}>
                                    
                                     <select  className='pcenter2  p-2 ' onChange={(e) => handleChangeBasedOnLevel()} id={`level${index}`} defaultValue={b.level}>                                      
                                        <option selected value="" disabled> سطح</option>
                                        <option value="business" disabled>کسب و کار</option>
                                        <option value="product" disabled>محصول</option>
                                        <option value="process" disabled>فرایند</option>
                                        <option value="value-added services" disabled>خدمات ارزش افزوده</option>
                                    </select>
                                </td>

                                <td className="widgetLgTd border mb-2" style={{ width: '280px' }}>
                                    <select  className='pcenter2  p-2 ' onChange={(e) => handleChangeBasedOnNature()} id={`nature${index}`} defaultValue={b.nature}>                                      
                                        <option selected value="" disabled> ماهیت</option>
                                        <option value="idea" disabled>ایده</option>
                                        <option value="study" disabled>مطالعه و پژوهش</option>
                                        <option value="primary product" disabled>محصول اولیه</option>
                                        <option value="final product" disabled>محصول نهایی</option>
                                    </select>
                                </td>

                                <td className="widgetLgTd border mb-2" style={{ width: '280px' }}>
                                    
                                    <select  className='pcenter2  p-2 '  id={`courseTitle${index}`} defaultValue={b.courseTitle}>                                      
                                        <option selected value="" disabled> انتخاب دوره</option>
                                        <option  value="1" disabled>دوره اول</option>
                                        <option  value="2" disabled>دوره دوم</option>
                                        <option  value='3' disabled>دوره سوم</option>
                                        <option  value='4' disabled>دوره چهارم</option>
                                        <option  value='5' disabled>دوره پنجم</option>
                                        <option  value='6' disabled>دوره ششم</option>
                                    </select>
                                </td>

                                <td className="widgetLgTd border mb-2" style={{ width: '280px' }}>
                                    <input className='pcenter2  p-2' placeholder={b.placeholder4} type="number" style={{width:"120px"}}   id={`stagePosition${index}`} defaultValue={b.stagePosition} readOnly/>  
                                </td>

                                <td className="widgetLgTd border mb-2" style={{ width: '280px' }}>
                                    <input className='pcenter2  p-2' placeholder={b.placeholder5} type="number" style={{width:"90px"}}  id={`generalPosition${index}`} defaultValue={b.generalPosition} readOnly/>
                                </td>

                                <td className="widgetLgTd border mb-2" style={{ width: '280px' }}>
                                    <input className='pcenter2  p-2' placeholder={b.placeholder6}  type="number"  id={`innovatorsClubScore${index}`} defaultValue={b.innovatorsClubScore} readOnly/>
                                </td>
                           
                            </tr>
                        ))}
                        </>
                        : <p className='text-end m-4 '>اطلاعاتی جهت نمایش وجود ندارد!</p> }
                    </table>
 


                    <hr />
                    <div className='d-flex'>
                        <div className=" col-md-6 col-6 align-items-start  justify-content-center">
                        <div className="d-flex justify-content-center align-items-start  " >                                                       
                               
                               {/* <PieChart className=" justify-content-center" style={{ maxWidth: "210px" }} data={dataMockLevel} lineWidth={36} startAngle={250} label={(data) => data.dataEntry.value} labelPosition={82} labelStyle={{ fontSize: "10px", fontWeight: "bold", fill: "#fff" }} />    */}

                               <Chart
                                            options={stateLevel.options}
                                            series={stateLevel.series}
                                            type="bar"
                                            width="500"
                                            />
                               
                           </div>

                   
                           {/* <div className="d-flex flex-wrap justify-content-center mt-4">
                               <div className="d-flex align-items-baseline mx-4"><i className="fa fa-circle" style={{ color: "#D1354D" }} aria-hidden="true"></i><p className="me-2"> کسب و کار </p></div>
                               <div className="d-flex align-items-baseline mx-4"><i className="fa fa-circle" style={{ color: "#205EAC" }} aria-hidden="true"></i><p className="me-2"> محصول </p></div>
                               <div className="d-flex align-items-baseline mx-4"><i className="fa fa-circle" style={{ color: "#DF7382" }} aria-hidden="true"></i><p className="me-2"> فرایند </p></div>
                               <div className="d-flex align-items-baseline mx-4"><i className="fa fa-circle" style={{ color: "#74A5E2" }} aria-hidden="true"></i><p className="me-3"> خدمات ارزش افزوده </p></div>
                               
                           </div> */}
                            <div className="mt-2 px-1 d-flex justify-content-center align-items-center ">
                                <label className="d-flex align-items-center justify-content-center mb-0 p-2  uploadPicStyle  ">
                                    {/* <i className="fa fa-fw fa-camera ms-1" aria-hidden="true"></i> */}
                                  
                                     گزارش تفکیکی بر اساس سطح                                  </label>
                            </div>
                        </div>
                    
                        <div className=" col-md-6 col-6 align-items-start  justify-content-center">
                            <div className="d-flex justify-content-center align-items-start " >
                                                                
                                {/* <PieChart id="PieChartnature" className=" justify-content-center" style={{ maxWidth: "210px" }} data={dataMockNature} lineWidth={36} startAngle={250} label={(data) => data.dataEntry.value} labelPosition={82} labelStyle={{ fontSize: "10px", fontWeight: "bold", fill: "#fff" }} />    */}

                                <Chart
                                            options={stateNature.options}
                                            series={stateNature.series}
                                            type="bar"
                                            width="500"
                                            />

                            </div> 

                            {/* <div className="d-flex flex-wrap justify-content-center mt-4">
                                <div className="d-flex align-items-baseline mx-4"><i className="fa fa-circle" style={{ color: "#D1354D" }} aria-hidden="true"></i><p className="me-2"> مطالعه و پژوهش</p></div>
                                <div className="d-flex align-items-baseline mx-4"><i className="fa fa-circle" style={{ color: "#205EAC" }} aria-hidden="true"></i><p className="me-2">ایده </p></div>
                                <div className="d-flex align-items-baseline mx-4"><i className="fa fa-circle" style={{ color: "#DF7382" }} aria-hidden="true"></i><p className="me-2">  محصول اولیه</p></div>
                                <div className="d-flex align-items-baseline mx-4"><i className="fa fa-circle" style={{ color: "#74A5E2" }} aria-hidden="true"></i><p className="me-2"> محصول نهایی </p></div>
                            </div> */}
                            <div className="mt-2 px-1 d-flex justify-content-center align-items-center ">
                                <label className="d-flex align-items-center justify-content-center mb-0 p-2   uploadPicStyle  ">
                                    {/* <i className="fa fa-fw fa-camera ms-1" aria-hidden="true"></i> */}
                                   
                                     گزارش تفکیکی بر اساس ماهیت  
                                </label>
                            </div>
                        </div>
                        
                     </div>
                  

                  


                </div>
            </div>


        </div>
        
       );
}

export default SelectedProfileView;