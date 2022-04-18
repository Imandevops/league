import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import HttpService from "../service/HttpService";
import { useEffect, useState } from "react";
import Header from './common/Header';
import Carousel from "react-multi-carousel";
import MainContext from './context/MainContext';

const Gallery = () => {

    const history = useHistory()

    const { setLoadingDialog } = useContext(MainContext)
    const [gallerys, setGallerys] = useState([])
    const [maxRound, setMaxRound] = useState()



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

    async function getGallerys() {
        try {
            setLoadingDialog(true)
            const { data, status } = await HttpService.get('/api/league/context/gallery')
            if (status === 200) {
                console.log('..........', data);
                for (let obj of data) {
                    const buffer = Buffer(obj.image.data);
                    const blob = new Blob([buffer.buffer], { type: obj.image.type });
                    const url = URL.createObjectURL(blob);
                    obj.url = url

                }
            }
            setGallerys(data)
            setMaxRound(getMaxRound(data))
            setLoadingDialog(false)
        } catch (error) {
            console.log(error);
        }

    }

    function getMaxRound(array) {
        const arrayRound = [];

        for (let obj of array) {

            if (!arrayRound.includes(obj.round))
                arrayRound.push(obj.round);

        }

        return Math.max.apply(Math, arrayRound);
    }


    function chunk(array, round) {
        const obj = [];

        for (let i = 1; i <= round; i++) {
            for (let a of array) {
                if (a.round == i) {
                    if (!obj[i]) {
                        obj[i] = [];
                    }
                    obj[i].push(a);
                }
            }
        }
        obj.reverse();
        return obj;
    }


    useEffect(() => {
        getGallerys()
    }, [])

    return (
        <div>
            <Header />

            {chunk(gallerys, maxRound).length > 0 ?
                <div className=" backgroundNews mb-5 mx-auto" >

                    {chunk(gallerys, maxRound).map((b, i) => (
                        <div style={ chunk(gallerys, maxRound)[i].length ===1  ? { direction: 'rtl'} : { direction: 'ltr'}}>
                            <h3 className='text-center mt-5'>دوره {maxRound - i}  </h3>
                            <Carousel
                                swipeable={true}
                                draggable={false}
                                showDots={false}
                                responsive={responsive}
                                autoPlay={true}
                                autoPlaySpeed={5000}
                                infinite={false}
                                centerMode={size.width > 501}
                                keyBoardControl={true}
                                infinite={ chunk(gallerys, maxRound)[i].length ===1  ? false : true}
                                customTransition="transform 300ms ease-in-out"
                                transitionDuration={1000}
                                customRightArrow={<CustomRightArrow />}
                                itemClass="carousel-item-padding-40-px"


                            >                                    
                                {chunk(gallerys, maxRound)[i].map(item => (
                                    <div className=' d-flex flex-column align-items-center px-1 px-md-3 h-100'>
                                        {/* <img src={carouselpic}></img> */}

                                        <div className=" card pt-5 border-0 border-radius-25px my-5 shadow news-slider h-100 w-100 " style={{ direction: 'rtl' }} >

                                            <div className="row g-0 p-1 border-radius-25px ">

                                                <div className="col-xl-8 d-flex align-items-center ">
                                                    <div className="card-body">

                                                        <p className="card-text pb-0 text-justify pe-4">
                                                            {item.context}
                                                        </p>


                                                    </div>
                                                </div>
                                                <div className="col-xl-4 d-flex align-items-center justify-content-center">
                                                    {console.log('kkkkgggggggggggkkkkkkkkk',item.url)}
                                                    <img src={item.url} className=" mx-auto px-2" style={{ borderRadius: '17px', maxWidth: '200px' }} alt="..." />
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                ))}
                            </Carousel>
                        </div>
                    )

                    )}


                </div>
                :
                <h5 className='text-center mt-3'>اطلاعاتی جهت نمایش وجود ندارد!</h5>}

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

export default Gallery;