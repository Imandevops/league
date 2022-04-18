import React from 'react';
import pic from '../../static/images/pic.png'
const NewsTest = () => {


    return (
        <div className='bg-news d-flex '>



            <div id="myCarousel" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                    <li data-target="#myCarousel" data-slide-to="1"></li>
                    <li data-target="#myCarousel" data-slide-to="2"></li>
                </ol>

                <div className="carousel-inner">
                    <div className="item active">

                        {/* <div className="card m-5 border-0 border-radius-25px news-slider">
                            <div className='px-4 py-5 rounded-circle mx-auto d-flex justify-content-center align-items-center bg-white news-circle' ><h6 className='bolder'>اخبار لیگ</h6></div>
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


                    </div>

                    <div className="item">
{/* 
                    <div className="card m-5 border-0 border-radius-25px news-slider">
                            <div className='px-4 py-5 rounded-circle mx-auto d-flex justify-content-center align-items-center bg-white news-circle' ><h6 className='bolder'>اخبار لیگ</h6></div>
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


                    </div>

                    <div className="item">

                    <div className="card m-5 border-0 border-radius-25px news-slider">
                            <div className='px-4 py-5 rounded-circle mx-auto d-flex justify-content-center align-items-center bg-white news-circle' ><h6 className='bolder'>اخبار لیگ</h6></div>
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
                        </div>

                    </div>
                </div>

                <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                    <span className="glyphicon glyphicon-chevron-left"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="right carousel-control" href="#myCarousel" data-slide="next">
                    <span className="glyphicon glyphicon-chevron-right"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>


























        </div >
    );
}

export default NewsTest;