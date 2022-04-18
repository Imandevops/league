import React from "react";
import email from "../../static/images/email.png"
import address from "../../static/images/address.png"
import phone from "../../static/images/phone-call.png"

const Footer = () => {
    return (
        <div className='bg-footer'>

            <footer className='pt-0 pb-3 container'>
                <div className='p-2 mt-0 '>
                    <p className="h3 mb-0 mt-2 text-dark fw-bolder">اطلاعات تماس</p>
                </div>
                <div className='line-footer'/>
                <div className='row pb-4'>
                    <div className="d-flex col-12 col-md-6 align-items-center">
                        <img src={address} className="m-3" style={{ maxWidth: "40px" }} />
                        <p className="h6 mt-3  text-dark">آدرس: تهران، خیابان پاسداران، نبش گلستان ششم، ساختمان<br /> بانک ملت، طبقه ششم</p>
                    </div>
                    <div className="d-flex col-12 col-md-3 align-items-center">
                        <img src={phone} className="m-2" style={{ maxWidth: "40px" }} />
                        <div className="">
                            <p className="h6 mb-0 m-1 text-dark">تلفن: 27315025</p>
                        </div>
                    </div>
                    <div className="d-flex col-12 col-md-3 align-items-center">
                        <img src={email} className="m-2" style={{ maxWidth: "40px" }} />
                        <div className="">
                            <p className="h6 mb-0 m-1 text-dark ">ایمیل: info@polwinno.org</p>
                        </div>
                    </div>

                </div>
            </footer>
        </div>
    );
}

export default Footer;