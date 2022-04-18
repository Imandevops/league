import React, { useContext, useState, useEffect } from 'react';
import HttpService from "../service/HttpService";
import MainContext from '../components/context/MainContext';
import Carousel from "react-multi-carousel";

import Header from './common/Header';
/*
import d1 from '../static/images/d1.png';
import d2 from '../static/images/d2.png';
import d3 from '../static/images/d3.png';
import d4 from '../static/images/d4.png';
import d5 from '../static/images/d5.png';
import d6 from '../static/images/d6.png';
import d7 from '../static/images/d7.png';
import d8 from '../static/images/d8.png';
import d9 from '../static/images/d9.png';
*/

const SecondLeague = () => {
    const { setLoadingDialog } = useContext(MainContext)
    const [judges, setJudges] = useState([])
    const [infos, setInfos] = useState([])
    const [winners, setWinners] = useState([])

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

    async function getViewUsers() {
        try {
            setLoadingDialog(true)
            const { data, status } = await HttpService.get('/api/league/context/judge')
            if (status === 200) {
                console.log('..........', data);
                for (let obj of data) {
                    const buffer = Buffer(obj.image.data);
                    const blob = new Blob([buffer.buffer], { type: obj.image.type });
                    const url = URL.createObjectURL(blob);
                    obj.url = url
                }
            }
            setJudges(data)
            setLoadingDialog(false)
        } catch (error) {
            console.log(error);
        }
    }

    async function getInfos() {
        try {
            setLoadingDialog(true)
            const { data, status } = await HttpService.get('/api/league/context/info')
            if (status === 200) {
                for (let obj of data) {
                    const buffer = Buffer(obj.image.data);
                    const blob = new Blob([buffer.buffer], { type: obj.image.type });
                    const url = URL.createObjectURL(blob);
                    obj.url = url
                }
            }
            setInfos(data)
            setLoadingDialog(false)
        } catch (error) {
            console.log(error);
        }
    }

    async function getWinners() {
        try {
            setLoadingDialog(true)
            const { data, status } = await HttpService.get('/api/league/context/winner')
            if (status === 200) {
                for (let obj of data) {
                    const buffer = Buffer(obj.image.data);
                    const blob = new Blob([buffer.buffer], { type: obj.image.type });
                    const url = URL.createObjectURL(blob);
                    obj.url = url
                }
            }
            setWinners(data)
            setLoadingDialog(false)

        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getViewUsers()
        getInfos()
        getWinners()
    }, [])



    return (<div>
        <Header />

        <h3 className='text-center mt-5'> عکس برندگان </h3>

        <div className=" backgroundNews mb-5 mx-auto" style={ winners.length ===1  ? { direction: 'rtl'} : { direction: 'ltr'}}>
            {/* <div className='roopicControl' > */}

            {winners && winners.length > 0 ?
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
                    infinite={ winners.length ===1  ? false : true}
                    customTransition="transform 300ms ease-in-out"
                    transitionDuration={1000}
                    customRightArrow={<CustomRightArrow />}
                    itemClass="carousel-item-padding-40-px"
                >
                    {winners.map(item => (
                        <div className=' d-flex flex-column align-items-center px-1 px-md-3 h-100'>
                            {/* <img src={carouselpic}></img> */}
                            <div className=" card border-0 border-radius-25px my-5 shadow news-slider h-100 w-100 " style={{ direction: 'rtl' }} >

                                <div className="row g-0 p-1 border-radius-25px justify-content-center align-items-center">

                                    <div className="col-xl-8 d-flex align-items-center ">
                                        <div className="card-body">

                                            <p className="card-text pb-0 text-justify pe-4">
                                                <b>دوره</b>    {item.leagueRound}
                                            </p>
                                            <p className="card-text pb-0 text-justify pe-4">
                                                <b>نام شرکت  : </b>  {"   " + item.companyName}
                                            </p>
                                            <p className="card-text pb-0 text-justify pe-4">
                                                <b>رتبه  : </b>  {"   " + item.rank}
                                            </p>
                                            <p className="card-text pb-0 text-justify pe-4">
                                                <b>نماینده طرح  : </b>   {"   " + item.planEnvoy}
                                            </p>
                                            <p className="card-text pb-0 text-justify pe-4">
                                                <b> اعضای تیم : </b>   {"  " + item.team}
                                            </p>

                                        </div>
                                    </div>
                                    <div className="col-xl-4 d-flex align-items-center justify-content-center">
                                        <img src={item.url} className=" px-2" style={{ borderRadius: '17px', maxWidth: '200px' }} alt="..." />
                                    </div>

                                </div>
                            </div>
                        </div>

                    ))}
                </Carousel>
                :
                <p className='text-center mt-3'>اطلاعاتی جهت نمایش وجود ندارد!</p>}

            <div className='roopicControl d-none d-md-flex'>

            </div>

            <div className='roopicControl1 d-none d-md-flex'>

            </div>


            {/* </div> */}
        </div>

        <h3 className='text-center mt-5'> اینفوگرافی و جداول </h3>
        <div className=" backgroundNews mb-5 mx-auto" style={ infos.length ===1  ? { direction: 'rtl'} : { direction: 'ltr'}}>
            {/* <div className='roopicControl' > */}
            {infos && infos.length > 0 ?
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
                    infinite={ infos.length ===1  ? false : true}
                    customTransition="transform 300ms ease-in-out"
                    transitionDuration={1000}
                    customRightArrow={<CustomRightArrow />}
                    itemClass="carousel-item-padding-40-px"
                >
                    {infos.map(item => (
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
                                    <div className="col-xl-4 d-flex align-items-center justify-content-center ">
                                        <img src={item.url} className=" px-2" style={{ borderRadius: '17px', maxWidth: '200px' }} alt="..." />
                                    </div>

                                </div>
                            </div>
                        </div>

                    ))}
                </Carousel>
                :
                <p className='text-center py-3'>اطلاعاتی جهت نمایش وجود ندارد!</p>}


            <div className='roopicControl d-none d-md-flex'>

            </div>

            <div className='roopicControl1 d-none d-md-flex'>

            </div>


            {/* </div> */}
        </div>

        <h3 className='text-center mt-5'> لیست داوران </h3>

        <div className=' row justify-content-center mb-5'>
            <div className='mt-5 col-12 d-flex justify-content-center align-items-center p-3  border mb-0 table-radius1 mb-2'>
                <div className='col-3 col-md-3 col-lg-33'>
                    <p className=' colorHList h4 text-center ps-5  my-2'>   </p>
                </div>
                <div className='col-3 col-md-3 col-lg-3'>
                    <p className=' h4 text-center  my-2'> نام داور</p>
                </div>
                <div className='col-3 col-md-3 col-lg-3'>
                    <p className=' h4 text-center  my-2'>سمت </p>
                </div>
            </div>
            {judges && judges.length > 0 ?
                judges?.map((p, index) => (
                    <div className='col-xl-12 col-sm-12 col-12 col-md-12 col-lg-12 d-flex justify-content-center align-items-center p-3 bg-white border table-radius1 '>
                        <div className='col-3 col-md-3 col-lg-3'>
                            <img src={p.url}></img>
                        </div>
                        <div className='col-3  col-md-3 col-lg-3'>
                            <p className='font-weight-bolder h5 text-center text-dark my-2'>{p.name}</p>
                        </div>
                        <div className='col-3 col-md-3 col-lg-3'>
                            <p className='h6 text-center text-dark'>{p.position}</p>
                        </div>
                    </div>
                )) :
                <p className='text-center mt-3'>اطلاعاتی جهت نمایش وجود ندارد!</p>
            }


        </div>




        {/* <div className="d-flex justify-content-center flex-column flex-lg-row">
            <a href="" target="_blank" className="my_card d-flex justify-content-center align-items-center p-2 m-2 cursor-pointer">
                <img src={camera} className='secondlaugueimg' />
                <p className="h5 font-weight-bolder m-2"> آیتم شماره 1</p>
            </a>
            <a href="" target="_blank" className="my_card d-flex justify-content-center align-items-center p-2 m-2 cursor-pointer">
                <img src={camera} className='secondlaugueimg' />
                <p className="h5 font-weight-bolder m-2"> آیتم شماره 2</p>
            </a>
            <a href="" target="_blank" className="my_card d-flex justify-content-center align-items-center p-2 m-2 cursor-pointer">
                <img src={camera} className='secondlaugueimg' />
                <p className="h5 font-weight-bolder m-2">  آیتم شماره 3</p>
            </a>
            <a href="" target="_blank" className="my_card d-flex justify-content-center align-items-center p-2 m-2 cursor-pointer">
                <img src={camera} className='secondlaugueimg' />
                <p className="h5 font-weight-bolder m-2">آیتم شماره 4</p>
            </a>
        </div> */}




    </div>);
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
export default SecondLeague;