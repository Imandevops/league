import React, { useEffect, useState } from 'react';

import HttpService from '../service/HttpService';
import { toastSuccess } from '../util/ToastUtil';
import { useHistory } from 'react-router';
import Carousel from "react-multi-carousel";
import Header from './common/Header';

const CompleteNews = ({ newsId }) => {
    const history = useHistory()
    const [news, setNews] = useState()
    const [newsUrl, setNewsUrl] = useState([])

    const size = useWindowSize();

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

    
    
    async function getnews() {

        try {
            const { data, status } = await HttpService.get(`/api/league/context/news/${newsId}`)
            if (status === 200) {
                console.log('dataaaaaaaa', data);
                data.url = []
                for (let i = 0; i < data.images.length; i++) {
                    const buffer = Buffer(data.images[i].data);
                    const blob = new Blob([buffer.buffer], { type: data.images[i].type });
                    const url = URL.createObjectURL(blob);
                    data.url.push({ fileName: data.images[i].fileName, filePath: url })

                }
                setNews(data)
                setNewsUrl(data.url)
                console.log('dataaaaaaaa2', data);
            }

        } catch (error) {
        }
    }


    useEffect(() => {
        getnews()
    }, [])


    return (

        <div className='container'>

            <Header />
            <div className=' boxcolor shadow mt-5 mb-5 mx-auto ' style={{backgroundColor:'lightgray'}}>
                    <h5 className='managementStyle d-flex justify-content-center p-2'> نمایش کامل خبر </h5>
                </div>
            <div className=' boxcolor  mt-5  shadow mx-auto'  >
                    <p className='about-padding '>
                        {news?.newsText}                  
                    </p>         

            </div>
            <div className='boxcolor  mt-5  shadow mx-auto  h-100 w-100'  style={ newsUrl.length ===1  ? { direction: 'rtl'} : { direction: 'ltr'}}>
                 {news && news.url.length ?
                     
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
                    infinite={ news.url.length ===1  ? false : true}                        
                    customTransition="transform 300ms ease-in-out"
                    transitionDuration={1000}
                    customRightArrow={<CustomRightArrow />}
                    itemClass="carousel-item-padding-40-px"      


                >
                    
                    {news?.url?.map(item => (
                            <div className=' d-flex flex-column align-items-center px-1 px-md-3 h-100'>
                         
                            <div className=" card pt-5 border-0 border-radius-25px  align-items-center my-5 shadow news-slider h-100 w-50 " style={{ alignItems : 'center' }} >
                                                               
                                    <div className="col-xl-4 d-flex align-items-center justify-content-center">
                                      
                                        <img src={item.filePath} className="mt-3 mx-auto px-2" style={{ borderRadius: '17px', maxWidth: '200px' }} alt="..." />
                                    </div>
                                
                            </div>
                        </div>
                
                    ))}               

                    </Carousel>
                    :
                    <p className='text-center py-3'>!عکسی جهت نمایش وجود ندارد</p>
                     
                 }
            </div>

        </div>

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

export default CompleteNews;