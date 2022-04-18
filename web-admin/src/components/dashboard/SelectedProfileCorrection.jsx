import React, { useContext, useEffect, useState } from 'react';

import { toastError, toastSuccess } from '../../util/ToastUtil';
import HttpService from '../../service/HttpService'
import { useHistory } from 'react-router';

import MainContext from '../context/MainContext';
import image2 from '../../static/image/image2.png';


import { fixNumbers, persianToTimestamp, timestampToPersian } from '../../util/DateUtil';

import DatePicker from 'react-multi-date-picker';

import { PieChart } from 'react-minimal-pie-chart';

import Chart from "react-apexcharts";





const SelectedProfileCorrection = ({ Id }) => {

    const [selectedProfiles, setSelectedProfiles] = useState()   
    const [userImageUrl, setUserImageUrl] = useState('')   
    const [imageBasedOnLevelUrl, setImageBasedOnLevelUrl] = useState('')   
    const [imageBasedOnNatureUrl, setImageBasedOnNatureUrl] = useState('')   

    const [userImageFile, setUserImageFile] = useState('') 
    const [imageBasedOnLevelFile, setImageBasedOnLevelFile] = useState('') 
    const [imageBasedOnNatureFile, setImageBasedOnNatureFile] = useState('') 



    let [row, setRow] = useState(0)

    let [study, setStudy] = useState(0)
    let [idea,  setIdea]  = useState(0)
    let [primaryProduct, setPrimaryProduct] = useState(0)
    let [finalproduct, setFinalproduct] = useState(0)

    let [business, setBusiness] = useState(0)
    let [product,  setProduct]  = useState(0)
    let [process, setProcess] = useState(0)
    let [valueAddedServices, setValueAddedServices] = useState(0)

    
   
    let temp = []
   


    const [x, setX] = useState([{
        placeholder1: 'عنوان طرح',
        placeholder2: 'سطح',
        placeholder3: 'عنوان دوره',
        placeholder4: '(مرحله ای)',
        placeholder5: '(کلی)',
        placeholder6: 'امتیاز باشگاه نوآوران',
      }])
      
      
      function handleAddRow() {
        let copy = [...x]
        copy.push({
            placeholder1: 'عنوان طرح',
            placeholder2: 'سطح',
            placeholder3: 'عنوان دوره',
            placeholder4: '(مرحله ای)',
            placeholder5: '(کلی)',
            placeholder6: 'امتیاز باشگاه نوآوران',
        })
        setX(copy)

        setRow(copy.length - 1)
      }

    function handleRemoveRow() {
        let copy = [...x]
        copy.pop()
        setX(copy)


        row = row -1
        setRow(row)

        handleChangeBasedOnNature()

        handleChangeBasedOnLevel()

    }

    

    // const dataMockNature = [
    //     { title: 'One', value: study, color: '#D1354D' },
    //     { title: 'One', value: idea, color: '#205EAC' },
    //     { title: 'One', value: primaryProduct, color: '#DF7382' },
    //     { title: 'One', value: finalproduct, color: '#74A5E2' },
    // ];

    // const dataMockLevel = [
    //     { title: 'One', value: business, color: '#D1354D' },
    //     { title: 'One', value: product, color: '#205EAC' },
    //     { title: 'One', value: process, color: '#DF7382' },
    //     { title: 'One', value: valueAddedServices, color: '#74A5E2' },
    // ];

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

        console.log('brow',row);
   
        console.log('bstudy',study);
        console.log('bidea',idea);
        console.log('bprimaryProduct',primaryProduct);
        console.log('bfinalproduct',finalproduct);
        

          
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
                
               

                document.getElementById('companyName').value=data.companyName;
          

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

               const Nature = { c1: "study", c2: "idea", c3: "primary product", c4: "final product" }

              

               setStudy(data?.designsProvidedList.filter(b => b.nature === Nature.c1).length);

               setIdea (data?.designsProvidedList.filter(b => b.nature === Nature.c2).length);
               setPrimaryProduct(data?.designsProvidedList.filter(b => b.nature === Nature.c3).length);
               setFinalproduct(data?.designsProvidedList.filter(b => b.nature === Nature.c4).length);
                
               const Level = { c1: "business", c2: "product", c3: "process", c4: "value-added services" }
    

                setBusiness(data?.designsProvidedList.filter(b => b.level === Level.c1).length);
                setProduct(data?.designsProvidedList.filter(b => b.level === Level.c2).length);
                setProcess(data?.designsProvidedList.filter(b => b.level === Level.c3).length);
                setValueAddedServices(data?.designsProvidedList.filter(b => b.level === Level.c4).length);
           
            

                           
            }

        } catch (error) {
            console.log('eeeeeeeeeee',error);
        }
    }

    const history = useHistory()

    const handleUploadEquipmentFile = async (e) => {          
        if (FileReader && e.target.files[0]) {
            var fr = new FileReader();           
            fr.onload = function () {                           
                document.getElementById('needyImg').src = fr.result;
            }
           
            await fr.readAsDataURL(e.target.files[0]);
        }
    };
   

          



    async function handleSelectedProfilesCorrection() {
     

      
        const name = document.getElementById("name").value;
        const family = document.getElementById("family").value;
        const lastEducationalCertificate = document.getElementById("lastEducationalCertificate").value;
        const companyName = document.getElementById("companyName").value;        
        const organizationLevel = document.getElementById("organizationLevel").value;
        const startDate = document.getElementById("startDate").value;
        const summeryExecutiveRecords = document.getElementById("summeryExecutiveRecords").value;
    
       

        let designsProvidedList = []
       
       
        x.forEach((b, index) =>
        
        designsProvidedList.push({
            
            name: document.getElementById(`name${index}`).value,
            level: document.getElementById(`level${index}`).value,
            nature: document.getElementById(`nature${index}`).value,
            courseTitle: document.getElementById(`courseTitle${index}`).value,
            stagePosition: document.getElementById(`stagePosition${index}`).value,
            generalPosition: document.getElementById(`generalPosition${index}`).value,
            innovatorsClubScore: document.getElementById(`innovatorsClubScore${index}`).value
          }))
     
         
    
          let date = startDate.split('/')
        
        const body = {
            name, family, lastEducationalCertificate,companyName, organizationLevel,  startDate: persianToTimestamp(parseInt(fixNumbers(date[0])), parseInt(fixNumbers(date[1])), parseInt(fixNumbers(date[2]))), summeryExecutiveRecords,designsProvidedList
        }
        

        const file = document.getElementById(`supplementaryFile1`).files[0];
     
        const data1 = new FormData();

        data1.append('body', JSON.stringify(body))

      
        
        
        if(file != null)
            data1.append('pic', file, 'userImage.' + file.name.split('.').pop())
     
        
        
    

        try {
                    
            const { status } = await HttpService.put(`/api/league/selectedProfiles/${Id}`, data1)
            if (status === 200) {
                toastSuccess("پروفایل با موفقیت ویرایش گردید")
                history.push('/dashbord/selectedProfiles')
                window.location.reload()
            }
        } catch (ex) {
            toastError(ex.response.data.message);
        }

    }

    useEffect(() => {
        getselectedProfiles()
                       
    }, [])



    const [date, setDate] = useState(new Date());

    return (
     


        <div className='container '>
            <div className='d-flex justify-content-center'  >
                <div className="d-flex flex-column mt-4 mb-4 p-4 border-0 border-radius-10px card1 card col-xl-11  ">

                <div className="userUpdateUpload">

                        <div className="col-12 col-sm-auto ">
                            <div className="mx-auto widthStyle" >
                                <div className="d-flex justify-content-center align-items-center rounded colorHeightStyle" >
                                   
                            
                                    <img src={userImageUrl} id='needyImg' alt="" />
                                        {/* p.fileName.split('.')[0] === 'userImage' ? p.filePath : url */}
                                    
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 mt-2 px-1 d-flex justify-content-start align-items-end">
                            <label className="d-flex align-items-center justify-content-center mb-0 p-2 text-white  border rounded-3  input-file" style={{ backgroundColor: 'rgb(15, 15, 240)' }}>
                                <i className="fa fa-fw fa-camera ms-1" aria-hidden="true"></i>
                                <input
                                    onChange={(e) => handleUploadEquipmentFile(e)}
                                    type="file"
                                    title="&nbsp;"
                                    accept="image/png, image/jpeg"
                                    className="d-none border-radius-05rem-0-0-05rem cursor-pointer"
                                    id="supplementaryFile1"
                                />
                                آپلود عکس
                               
                            </label>
                        </div>
                </div>

                   
                           
                               

                    <div className='d-flex justify-content-between mt-3 row'>
                        <div className='col-12 col-md-4'>
                            <div className='d-flex flex-column'>
                                <div className=' d-flex align-items-center justify-content-center'>                                    
                                    <input class="pcenter my-0 flex-grow-1 py-2 px-1 mx-0 outline-none"  defaultValue={selectedProfiles?.name} id='name' />
                                </div>
                            </div>
                        </div>
                    
                        <div className='col-12 col-md-4 col-lg-4'>
                            <div className='d-flex flex-column'>
                                <div className=' d-flex align-items-center justify-content-center px-0'>
                                    <input class="pcenter my-0 flex-grow-1 py-2 px-1 mx-0 outline-none" placeholder='نام خانوادگی' defaultValue={selectedProfiles?.family} id='family' />
                                </div>
                            </div>
                        </div>
                   

                        <div className='col-12 col-md-4 '>
                            <div className='d-flex flex-column'>
                                <div className=' d-flex align-items-center justify-content-center'>
                                    <input class="pcenter my-0 flex-grow-1 py-2 px-1 mx-0 outline-none" placeholder='آخرین مدرک تحصیلی' defaultValue={selectedProfiles?.lastEducationalCertificate} id="lastEducationalCertificate" />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='d-flex justify-content-between mt-3 row'>
                            <div className='col-12 col-md-4 '>
                                <div className='d-flex flex-column'>
                                    <div className=' d-flex align-items-center justify-content-center'>                                  
                                        <select className="select pcenter my-0 flex-grow-1 py-2 px-1 mx-0 outline-none"  id="companyName">
                                            <option className='outline-none border-0 bg-gray' selected value="1" disabled>نام شرکت</option>
                                            <option className='outline-none border-0 ' value="BSM">بهسازان ملت</option>
                                            <option className='outline-none border-0 ' value="BPM">به پرداخت ملت</option>
                                            <option className='outline-none border-0 ' value='SYS'>مهندسی سیستم یاس</option>
                                            <option className='outline-none border-0 ' value='YaasSie'>مهندسی صنایع یاس ارغوانی</option>
                                            <option className='outline-none border-0 ' value='SITS'>زیرساخت امن خدمات تراکنشی</option>
                                            <option className='outline-none border-0 ' value='SHGH'>مهندسی نرم افزار شقایق</option>
                                        </select>
                                    </div>
                                </div>
                             </div>
                  
                             <div className='col-12 col-md-4 col-lg-4'>
                                <div className='d-flex flex-column'>
                                    <div className=' d-flex align-items-center justify-content-center'>
                                        <input class="pcenter my-0 flex-grow-1 py-2 px-1 mx-0 outline-none" placeholder='سمت سازمانی' defaultValue={selectedProfiles?.organizationLevel} id="organizationLevel" />
                                    </div>
                                </div>                              
                            </div>                      
                        
                   
                            <div className='col-12 col-md-4 col-lg-4'>
                            <div className='d-flex flex-column'>
                                <div className=' d-flex align-items-center justify-content-center'>
                                  
                                    <DatePicker
                                        value={selectedProfiles?.startDate ? timestampToPersian(new Date(selectedProfiles?.startDate).getTime()) : null}
                                        type='text'
                                        locale='fa'
                                        calendar='persian'
                                        inputMode='none'
                                        inputClass='w-100 bg-input-dialog mt-0'
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
                                    <textarea rows="6" cols="10" class="pcenter my-0 flex-grow-1 py-2 px-1 mx-0 outline-none" placeholder='خلاصه ای از سوابق اجرایی ' defaultValue={selectedProfiles?.summeryExecutiveRecords} id='summeryExecutiveRecords' />
                                
                                </div>
                            </div>
                        </div>
                       
                    </div>

                    <div className="d-flex justify-content-between align-items-center admin-btn bg-persian-red text-white align-self-start mx-5 py-0 mt-4 border-0 rounded mb-2" id='addAuthor'>
                        <i className="fa fa-plus p-1 rounded-end cursor-p" id='addRow' onClick={handleAddRow}></i>
                        <p className="mb-0 border-end border-start px-1"> لیست طرح های اضافه شده در لیگ</p>
                        <i className="fa fa-minus bg-persian-red p-1 rounded-start cursor-p" id='removeRow' onClick={handleRemoveRow}></i>
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
                                    <input className='pcenter2  p-2' placeholder={b.placeholder1} type="text" size={26} id={`name${index}`} defaultValue={b.name} /> 
                                </td>

                                <td className="widgetLgTd border mb-2" style={{ width: '280px' }}>
                                    
                                     <select  className='pcenter2  p-2 ' onChange={(e) => handleChangeBasedOnLevel()} id={`level${index}`} defaultValue={b.level}>                                      
                                        <option selected value="" disabled> سطح</option>
                                        <option value="business">کسب و کار</option>
                                        <option value="product">محصول</option>
                                        <option value="process">فرایند</option>
                                        <option value="value-added services">خدمات ارزش افزوده</option>
                                    </select>
                                </td>

                                <td className="widgetLgTd border mb-2" style={{ width: '280px' }}>
                                    <select  className='pcenter2  p-2 ' onChange={(e) => handleChangeBasedOnNature()} id={`nature${index}`} defaultValue={b.nature}>                                      
                                        <option selected value="" disabled> ماهیت</option>
                                        <option value="idea">ایده</option>
                                        <option value="study">مطالعه و پژوهش</option>
                                        <option value="primary product">محصول اولیه</option>
                                        <option value="final product">محصول نهایی</option>
                                    </select>
                                </td>

                                <td className="widgetLgTd border mb-2" style={{ width: '280px' }}>
                                    
                                    <select  className='pcenter2  p-2 '  id={`courseTitle${index}`} defaultValue={b.courseTitle}>                                      
                                        <option selected value="" disabled> انتخاب دوره</option>
                                        <option  value="1">دوره اول</option>
                                        <option  value="2">دوره دوم</option>
                                        <option  value='3'>دوره سوم</option>
                                        <option  value='4'>دوره چهارم</option>
                                        <option  value='5'>دوره پنجم</option>
                                        <option  value='6'>دوره ششم</option>
                                    </select>
                                </td>

                                <td className="widgetLgTd border mb-2" style={{ width: '280px' }}>
                                    <input className='pcenter2  p-2' placeholder={b.placeholder4} type="number" style={{width:"120px"}}   id={`stagePosition${index}`} defaultValue={b.stagePosition} />  
                                </td>

                                <td className="widgetLgTd border mb-2" style={{ width: '280px' }}>
                                    <input className='pcenter2  p-2' placeholder={b.placeholder5} type="number" style={{width:"90px"}}  id={`generalPosition${index}`} defaultValue={b.generalPosition} />
                                </td>

                                <td className="widgetLgTd border mb-2" style={{ width: '280px' }}>
                                    <input className='pcenter2  p-2' placeholder={b.placeholder6}  type="number"  id={`innovatorsClubScore${index}`} defaultValue={b.innovatorsClubScore} />
                                </td>
                           
                            </tr>
                        ))}
                        </>
                        : <p className='text-end m-4 '>اطلاعاتی جهت نمایش وجود ندارد!</p> }
                    </table>
 
                
                 
                    
                
                    <hr />
                    <div className='d-flex'>
                        <div className=" col-md-6 col-6 align-items-start  justify-content-center">
                        
                            <div className="d-flex justify-content-center align-items-start  " style={{width: "600px",height: "300px" }} >                                                       
                               
                                {/* <PieChart id="pieChartLevel" className=" justify-content-center" style={{ maxWidth: "210px" }} data={dataMockLevel} lineWidth={36} startAngle={250} label={(data) => data.dataEntry.value} labelPosition={82} labelStyle={{ fontSize: "10px", fontWeight: "bold", fill: "#fff" }} />    */}
                                
                                <Chart
                                            options={stateLevel.options}
                                            series={stateLevel.series}
                                            type="bar"
                                            width="500"
                                            />
                            </div>

                            {/*                     
                            <div className="d-flex flex-wrap justify-content-center mt-4">
                                <div className="d-flex align-items-baseline mx-4"><i className="fa fa-circle" style={{ color: "#D1354D" }} aria-hidden="true"></i><p className="me-2"> کسب و کار </p></div>
                                <div className="d-flex align-items-baseline mx-4"><i className="fa fa-circle" style={{ color: "#205EAC" }} aria-hidden="true"></i><p className="me-2"> محصول </p></div>
                                <div className="d-flex align-items-baseline mx-4"><i className="fa fa-circle" style={{ color: "#DF7382" }} aria-hidden="true"></i><p className="me-2"> فرایند </p></div>
                                <div className="d-flex align-items-baseline mx-4"><i className="fa fa-circle" style={{ color: "#74A5E2" }} aria-hidden="true"></i><p className="me-3"> خدمات ارزش افزوده </p></div>
                                
                            </div> */}

                            <div className="mt-2 px-1 d-flex justify-content-center align-items-center ">
                                <label className="d-flex align-items-center justify-content-center mb-0 p-2   uploadPicStyle  ">
                                    {/* <i className="fa fa-fw fa-camera ms-1" aria-hidden="true"></i> */}
                                   
                                     (گزارش تفکیکی بر اساس سطح)
                                </label>
                            </div>
                        </div>
                    
                    
                        <div className=" col-md-6 col-6 align-items-start  justify-content-center">
                        
                        

                            <div className="d-flex justify-content-center align-items-start " style={{width: "600px",height: "300px" }}>
                                                                
                                {/* <PieChart id="PieChartNature" className=" justify-content-center" style={{ maxWidth: "210px" }} data={dataMockNature} lineWidth={36} startAngle={250} label={(data) => data.dataEntry.value} labelPosition={82} labelStyle={{ fontSize: "10px", fontWeight: "bold", fill: "#fff" }} />    */}

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
                                <label className="d-flex align-items-center justify-content-center mb-0 p-2  uploadPicStyle  ">
                                    {/* <i className="fa fa-fw fa-camera ms-1" aria-hidden="true"></i>                             */}
                                     (گزارش تفکیکی بر اساس ماهیت)
                                </label>
                            </div>
                        </div>
                        
                     </div>
                  

                    <div className='d-flex justify-content-center mt-3 row'>

                        <div className=' d-flex justify-content-center col-12 col-md-6 col-lg-3'>
                            <button className='formbutton2  flex-grow-1 mx-4 outline-0' onClick={handleSelectedProfilesCorrection} > ویرایش </button>
                        </div>
                    </div>



                </div>
            </div>


        </div>
        
       );
}

export default SelectedProfileCorrection;