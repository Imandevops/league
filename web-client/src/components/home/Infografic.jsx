import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import HttpService from '../../service/HttpService';
import INPHO2 from '../../static/images/INPHO2.png'




const Infografic = () => {
    const history = useHistory();
    const [infographics, setInfographics] = useState([])
    const [url, setUrl] = useState('')


    async function getLastInfographicPic() {

       
        try {
            const { data, status } = await HttpService.get('/api/league/context/about/last')
            if (status === 200) {
                const buffer = Buffer(data.image.image.data);
                const blob = new Blob([buffer.buffer], { type: data.image.image.type });
                const url = URL.createObjectURL(blob);
              
                data.url = url
                setUrl(data.url)
               
            }
            setInfographics(data)
            
         
        } catch (error) {
        }

    


    }

    useEffect(() => {
        getLastInfographicPic()
    }, [])

    return (
        <div>

            <div className="d-flex align-items-center title-drag-list  mt-5 mb-0">
                <div className="line">
                </div>
                <div className="line-alter">
                </div>
                <p className="text-center  align-self-start  m-0 p-0 mx-3 drag-title justify-content-center lalezar"> لیگ در یک نگاه </p>
            </div>


            <div className='text-center'>
                <div className='container bgw-infografic m-5 p-5 mx-auto shadow'>
                        
                     {Object.keys(infographics).length > 0 ?
                            <div div className='p-3'>
                                < img src={url} alt="no pictuer" class="coverpic-size1 m-4" />
                            </div>
                      :
                      <p className='text-center py-3'>!اطلاعاتی جهت نمایش وجود ندارد</p>}
  

                    {/* 
                    <div className='d-flex justify-content-end align-align-items-center'>
                        <div className='ps-3 pt-1 '>
                            <span className='infoTextColor cursor-p ' onClick={() => history.push('/about')} >اطلاعات بیشتر</span>
                        </div>
                        <div className='ps-3'>
                            <i className="icon-pre fa fa-chevron-circle-left  " aria-hidden="true" onClick={() => history.push('/about')}></i>
                        </div>
                    </div>
                    {/* </div> */}



                </div>




                <div className="d-flex align-items-center title-drag-list margintopinfografic mb-0">
                    <div className="line">
                    </div>
                    <div className="line-alter">
                    </div>
                    <p className="text-center  align-self-start  m-0 p-0 mx-3 drag-title justify-content-center lalezar"> لیگ دوم </p>
                </div>








                <div className='container bgw-infografic m-5 p-5 mx-auto shadow'>
                    {/* <div className='bg-infografic p-4  '> */}
                    <div className='p-3 d-flex justify-content-center '>
                        <img src={INPHO2} alt=" no pictuer" className="coverpic-size mx-auto m-4" />
                    </div>
                    <div className='d-flex justify-content-end align-align-items-center'>
                        <div className='ps-3 pt-1 '>
                            <span className='infoTextColor cursor-p ' onClick={() => history.push('/secondleague')} >اطلاعات بیشتر</span>
                        </div>
                        <div className='ps-3'>
                            <i className="icon-pre fa fa-chevron-circle-left  " aria-hidden="true" onClick={() => history.push('/secondleague')}></i>
                        </div>
                    </div>
                    {/* </div> */}

                </div>
            </div>
        </div >
    )
}

export default Infografic;