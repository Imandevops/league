import React, { useEffect, useState } from 'react';
import HttpService from "../../service/HttpService";
import { useHistory } from "react-router";

import carouselpic from '../../static/images/carouselpic.png';
import Carousel from "react-multi-carousel";
import n1 from '../../static/images/n1.png';
import n2 from '../../static/images/n2.png';
import n3 from '../../static/images/n3.png';
import n4 from '../../static/images/n4.png';
import n5 from '../../static/images/n5.png';
import roopic from '../../static/images/roopic.png'
import react from 'react';


const News = () => {

    const size = useWindowSize();
    const [news, setNews] = useState([])

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
            slidesToSlide: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
            slidesToSlide: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1
        }
    };

    const history = useHistory()

    async function getNews() {
        try {
            const { data, status } = await HttpService.get('/api/league/context/news/slider')
            if (status === 200) {
                console.log('..........', data);
                for (let obj of data) {

                   if(obj.image.data != undefined)
                   {
                    const buffer = Buffer(obj.image.data);
                    const blob = new Blob([buffer.buffer], { type: obj.image.type });
                    const url = URL.createObjectURL(blob);
                    obj.url = url
                   }                                                         
                }
            }

            setNews(data)            
         
        } catch (error) {
            console.log(error);
        }
    }

    const handleContinue = (newsId) => {
        history.push(`/CompleteNews/${newsId}`)
    }

    

    useEffect(() => {
        getNews()
    }, [])

    return (

        <>
            <div className="d-flex align-items-center title-drag-list  mt-5 mb-0">
                <div className="line">
                </div>
                <div className="line-alter">
                </div>
                <p className="text-center  align-self-start  m-0 p-0 mx-3 drag-title justify-content-center lalezar">اخبار لیگ </p>
            </div>
            
           
            <div className=" backgroundNews mb-5 mx-auto" style={ news.length ===1  ? { direction: 'rtl'} : { direction: 'ltr'}} >

                {/* <div className='roopicControl' > */}

                {news && news.length > 0 ?

                    <Carousel Carousel
                        swipeable={true}
                        draggable={false}
                        showDots={false}
                        responsive={responsive}                        
                        autoPlay={true}
                        autoPlaySpeed={5000}
                        infinite={false}
                        centerMode={size.width > 501}
                        keyBoardControl={true}
                        infinite={ news.length ===1  ? false : true}                        
                        customTransition="transform 300ms ease-in-out"
                        transitionDuration={1000}
                        customRightArrow={<CustomRightArrow />}
                        itemClass="carousel-item-padding-40-px"                        
                    >
                        {news.map(item => (
                            <div className=' d-flex flex-column align-items-center px-1 px-md-3 h-100'>
                                {/* <img src={carouselpic}></img> */}
                                <div className=" card pt-5 border-0 border-radius-25px my-5 shadow news-slider h-100 " style={{ direction: 'rtl' }} >
                                    <div className='px-4 py-5 shadow rounded-circle mx-auto d-flex justify-content-center align-items-center bg-white news-circle' ><h6 className='bolder'>اخبار لیگ</h6></div>
                                    <div className="row g-0 p-1 border-radius-25px ">

                                        <div className="col-xl-8 d-flex align-items-center " >
                                            <div className="card-body"  >
                                                <h6 className="card-text pt-0 pe-4 text-end">{item.newsTitle}</h6>
                                                
                                             
                                                <p className="card-text pb-0 text-justify pe-4 ">
                                                    {item.newsText.substring(0, 350) + '.....'}
                                                </p>
                                                <h6 className="card-text pt-0 pe-4 text-end">{item.company}</h6>
                                                {/* {item.company =="بهسازان فردا" ?
                                            :
                                            <div>
                                                <div className="d-flex flex-wrap justify-content-center">
                                                    <div className="d-flex align-items-baseline mx-4"><i className="fa fa-circle" style={{ color: "Purple" }} aria-hidden="true"></i><p className="mr-2"> به‌پرداخت</p></div>
                                                    <div className="d-flex align-items-baseline mx-4"><i className="fa fa-circle" style={{ color: "#269cd9" }} aria-hidden="true"></i><p className="mr-2">بهسازان ملت</p></div>
                                                    <div className="d-flex align-items-baseline mx-4"><i className="fa fa-circle" style={{ color: "orange" }} aria-hidden="true"></i><p className="mr-2"> سیستم یاس</p></div>
                                                    <div className="d-flex align-items-baseline mx-4"><i className="fa fa-circle" style={{ color: "green" }} aria-hidden="true"></i><p className="mr-2"> صنایع یاس</p></div>
                                                    <div className="d-flex align-items-baseline mx-4"><i className="fa fa-circle" style={{ color: "yellow" }} aria-hidden="true"></i><p className="mr-2"> زیرساخت</p></div>
                                                    <div className="d-flex align-items-baseline mx-4"><i className="fa fa-circle" style={{ color: "red" }} aria-hidden="true"></i><p className="mr-2"> شقایق</p></div>
                                                    <div className="d-flex align-items-baseline mx-4"><i className="fa fa-circle" style={{ color: "royalblue" }} aria-hidden="true"></i><p className="mr-2"> معاونت امنیت هلدینگ</p></div>
                                                </div>
                                            </div>
                                        } */}
                                            </div>
                                        </div>
                                        <div className="col-xl-4 d-flex align-items-center ">
                                          
                                       
                                            {item.url != undefined ? (
                                                    <img src={item.url}   className=" mx-auto px-2" style={{ borderRadius: '17px', maxWidth: '200px' }} alt="..." />
                                                ) : null}

                                            
                                            
                                        </div>
                                        
                                   
                                        <div className="py-2 px-5 align-items-center " style={{direction: 'ltr' }}>
                                            
                                             <button className='formbutton col-xl-2  flex-grow-1 mx-4  outline-0' style={{direction: 'ltr' }} onClick={() => handleContinue(item.newsId)}> ادامه </button>                                                                                                                                                                                                                   
                                            
                                        </div>

                                    </div>
                                </div>
                            </div>

                        ))}




                        {/* <div className='d-flex flex-column align-items-center px-5 '>
                        <img src={carouselpic} ></img>
                    </div>
                    <div className='d-flex flex-column align-items-center px-5 '>
                        <img src={carouselpic} ></img>
                    </div>
                    <div className='d-flex flex-column align-items-center px-5 '>
                        <img src={carouselpic} ></img>
                    </div>
                    <div className=' d-flex flex-column align-items-center  px-5 '>
                        <img src={carouselpic} ></img>
                    </div>
                    <div className='d-flex flex-column align-items-center px-5 '>
                        <img src={carouselpic} ></img>
                    </div>
                    <div className='d-flex flex-column align-items-center px-5 '>
                        <img src={carouselpic} ></img>
                    </div>
                    <div className='d-flex flex-column align-items-center px-5 '>
                        <img src={carouselpic} ></img>
                    </div> */}


                    </Carousel>
                    :
                    <p className='text-center py-3'>!اطلاعاتی جهت نمایش وجود ندارد</p>}


                <div className='roopicControl d-none d-md-flex'>

                </div>

                <div className='roopicControl1 d-none d-md-flex'>

                </div>

            </div >

        </>


    );
}

function CustomRightArrow({ onClick }) {
    return (
        <button
            onClick={() => onClick()}
            aria-label="Go to next slide"
            className="react-multiple-carousel__arrow react-multiple-carousel__arrow--right"
        />
    );
}




function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });
    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
}




{/* <div className='bg-news  d-flex pt-0 pb-0 '> */ }

{/* <img className='carousel-size' src={carousel} alt=""/> */ }

{/* <div className=" card m-5 border-0 border-radius-25px shadow news-slider">
                <div className='px-4 py-5 rounded-circle mx-auto d-flex justify-content-center align-items-center bg-white news-circle' ><h6 className='bolder'>اخبار لیگ</h6></div>
                <div className="row g-0 p-1 border-radius-25px ">
                    <>
                        <div className="col-md-8 d-flex align-items-center ">
                            <div className="card-body">
                                <p className="card-text pb-0 text-justify">
                                    ماموریت اصلی گروه فن آوران هوشمند بهسازان فردا ، توسعه، تأمین، تدارک و ارائه خدمات جامع در حوزه فناوری اطلاعات به بانک ملت به‌عنوان سهامدار اصلی و سایر مشتریان متقاضی این نوع خدمات است.
                                </p>
                                <h6 className="card-text pt-0">بهسازان فردا</h6>
                            </div>
                        </div>
                        <div className="col-md-4 d-flex align-items-center px-2">
                            <img src={pic} className="img-fluid rounded-starte mx-auto" style={{ borderRadius: '17px' }} alt="..." />
                        </div>
                    </>
                </div>
            </div> */}

{/* <img className='carousel-size' src={carousel} alt=""/> */ }

{/* <div className=" card m-5 shadow border-0 border-radius-25px news-slider"style={{ minWidth: '580px'}} >
                <div className='px-4  py-5 rounded-circle mx-auto d-flex justify-content-center align-items-center bg-white news-circle'  ><h6 className='bolder'>اخبار لیگ</h6></div>
                <div className="row g-0 p-1 border-radius-25px ">
                    <>
                        <div className="col-md-8 d-flex align-items-center ">
                            <div className="card-body">
                                <p className="card-text pb-0 text-justify">
                                    ماموریت اصلی گروه فن آوران هوشمند بهسازان فردا ، توسعه، تأمین، تدارک و ارائه خدمات جامع در حوزه فناوری اطلاعات به بانک ملت به‌عنوان سهامدار اصلی و سایر مشتریان متقاضی این نوع خدمات است. همچنین گروه بهسازان فردا، با توجه به ظرفیت فوق‌العاده و روند تحولات،
                                </p>
                                <h6 className="card-text pt-0">بهسازان فردا</h6>
                            </div>
                        </div>
                        <div className="col-md-4 d-flex align-items-center px-2">
                            <img src={pic} className="img-fluid rounded-starte mx-auto" style={{ borderRadius: '17px' }} alt="..." />
                        </div>
                    </>
                </div>
            </div> */}


{/* <img className='carousel-size' src={carousel} alt=""/> */ }


{/* <div className=" card m-5 border-0 border-radius-25px shadow news-slider" >
                <div className='px-4 py-5 rounded-circle mx-auto d-flex justify-content-center align-items-center bg-white news-circle' ><h6 className='bolder'>اخبار لیگ</h6></div>
                <div className="row g-0 p-1 border-radius-25px ">
                    <>
                        <div className="col-md-8 d-flex align-items-center ">
                            <div className="card-body">
                                <p className="card-text pb-0 text-justify">
                                ماموریت اصلی گروه فن آوران هوشمند بهسازان فردا ، توسعه، تأمین، تدارک و ارائه خدمات جامع در حوزه فناوری اطلاعات به بانک ملت به‌عنوان سهامدار اصلی و سایر مشتریان متقاضی این نوع خدمات است،
                                </p>
                                <h6 className="card-text pt-0">بهسازان فردا</h6>
                            </div>
                        </div>
                        <div className="col-md-4 d-flex align-items-center px-2">
                            <img src={pic} className="img-fluid rounded-starte mx-auto" style={{ borderRadius: '17px' }} alt="..." />
                        </div>
                    </>
                </div>
            </div> */}











{/*     
    <div id="carouselExampleControls" className="carousel slide justify-content-center d-flex " data-bs-ride="carousel">
  <div className="carousel-inner carousel-size ">
    <div className="carousel-item active">
      <img className='carousel-size d-block ' src={carouselpic} alt="..."/>
    </div>
    <div className="carousel-item">
      <img className='carousel-size d-block ' src={carouselpic} alt="..."/>
    </div>
    <div className="carousel-item">
      <img className='carousel-size d-block' src={carouselpic} alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div> */}






export default News;