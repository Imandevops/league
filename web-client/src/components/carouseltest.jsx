import React from 'react';
import carouselpic from '../../src/static/images/carouselpic.png';
import Carousel from "react-multi-carousel";
import "../static/css/react-carousel.css";

const CarouselTest = () => {

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items:2,
            slidesToSlide: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1
        }
    };




    return (

        <div className="container mx-auto" style={{ direction: 'ltr' }}>
            <Carousel
                swipeable={true}
                draggable={false}
                showDots={false}
                responsive={responsive}
                infinite={false}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={1000}
                customRightArrow={<CustomRightArrow />}
                itemClass="carousel-item-padding-40-px"
            >
                <div className=' d-flex flex-column align-items-center px-5 '>
                    <img src={carouselpic}></img>
                </div>
                <div className=' d-flex flex-column align-items-center px-5 '>
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
                </div>
        
            </Carousel>
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



export default CarouselTest;