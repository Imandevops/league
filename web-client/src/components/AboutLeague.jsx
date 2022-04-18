import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import HttpService from '../service/HttpService';
import info from '../static/images/info1.png'
import Header from './common/Header';
import logo from '../static/images/logo.png'

const AboutLeague = () => {

    const history = useHistory()

    const [content, setContent] = useState([])


    async function getAboutContent() {
        try {
            const { data, status } = await HttpService.get('/api/league/context/about/last')
            if (status === 200) {

                setContent(data)

            }
        } catch (error) {
        }
    }


    useEffect(() => {
        getAboutContent()
    }, [])


    return (
        <div>
            <Header />

            <div className='container aboutBackground '>

                <div className='aboutBackgroundpic'></div>
                <div className=' boxcolor1  mt-5  shadow mx-auto' >
                    {content && content?.aboutText ?
                        <p className='about-padding '>
                            {content?.aboutText}

                        </p> :
                        <p className='text-center mt-3'>اطلاعاتی جهت نمایش وجود ندارد!</p>
                    }

                </div>
               
                <div className='dotBackgroundpic'></div>

                <div className=' boxcolor  mt-5 shadow text-center' >

                    <img src={info} alt=" no pictuer" className='coverpic-size mx-auto m-3 left-0' />

                </div>
                <div className=' boxcolor1  mt-5 mb-5 shadow mx-auto' >
                    <p className='about-padding ' >
                        <img src={logo} alt="" />
                        لیگ نوآوری توسط مرکز نوآوری بهسازان فردا (پل‌وینو) برگزار می‌شود. پل‌وینو به عنوان مرکز نوآوری گروه فن‌آوران هوشمند بهسازان فردا فعالیت خود را از دی ماه سال 1397 آغاز کرده است. هدف این مرکز توسعه و تقویت فعالیت‌های نوآورانه در شرکت‌های گروه و انجام مطالعات و تحقیقات در جهت استفاده به‌موقع و مناسب از فناوری‌های نوین در راستای اهداف بانک ملت و مجموعه‌های وابسته از طریق ارائه محصولات و خدمات برتر و متمایز، ارتقای سطح دانش سازمانی و همچنین ارتقای سطح فناوری‌های به‌کار گرفته شده و مشارکت در پروژه‌های ملی در سطح کشور است. رویکرد این مرکز استفاده از تمام ظرفیت‌های داخلی کشور، شناسایی و جذب استعدادهای برتر و مشارکت با شرکت‌ها، مراکز تحقیقاتی و موسسات علمی است.
                    </p>
                </div>
            </div>


        </div>

    );
}

export default AboutLeague;
