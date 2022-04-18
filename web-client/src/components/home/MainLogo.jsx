import React from 'react';
import mainlogo from '../../static/images/mainlogo.png'
import Flag from '../../static/images/flag.png'
import { useHistory } from 'react-router';


const MainLogo = () => {

    const history = useHistory();
    return (
        <div className='container bg-mainLogo d-flex justify-content-between pb-0 row mx-auto'>
            <div className=' d-flex  align-items-center justify-content-center col-12 col-md-6'>
                <div >
                    <h1 className='innovationlaegue-fsize col-12 pe-5'>
                        لیگــــ نوآوری
                    </h1>
                    <h1 className='polwinno-fsize mb-0 col-12 pe-5'>
                        پل‌ویـنو
                    </h1>
                    <div className='d-flex pe-5'>
                        <img src={Flag} className='flag-size' alt="عکس برای نمایش وجود ندارد" srcset="" />
                        <h5 className='me-3'>فرصتـــی برای دیده شدن توانایـــی‌های شما</h5>
                    </div>
                    <div className='pe-5'>
                        <button className='btn-blue pt-0 pb-2' onClick={() => history.push('/login')}>ورود</button>
                    </div>
                </div>

            </div>
            <div className='col-12 col-md-6'>
                <img src={mainlogo} />
            </div>
        </div>


    );
}

export default MainLogo;