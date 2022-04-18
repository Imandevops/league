import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import logoheader from '../../static/images/logoheader.png';

const Header = () => {
    const history = useHistory();
    const location = useLocation();
    return (
        <div className='container d-flex'>
            <nav className='navbar navbar-light d-flex justify-content-between w-100 '>
                <div className='d-flex h-100'>
                    <p className={`text-black px-1 px-md-4 py-2 header-item h-100 d-flex align-items-center text-center ${location.pathname === "/about" && 'bgc-header'}`} onClick={() => history.push('/about')}>درباره لیگ</p>
                    <p className={`text-black px-1 px-md-4 py-2 header-item h-100 d-flex align-items-center text-center ${location.pathname === "/gallery" && 'bgc-header'}`} onClick={() => history.push('/gallery')}>گالری تصاویر</p>
                    <p className={`text-black px-1 px-md-4 py-2 header-item h-100 d-flex align-items-center text-center ${location.pathname === "/downloads" && 'bgc-header'}`} onClick={() => history.push('/downloads')}>دانلود‌ها </p>
                    <p className={`text-black px-1 px-md-4 py-2 header-item h-100 d-flex align-items-center text-center ${location.pathname === "/SelectedProfiles" && 'bgc-header'}`} onClick={() => history.push('/SelectedProfiles')}>برگزیده ها </p>
                </div>
                <div className=''>
                    {/* <button className='btn-blue' onClick={() => history.push('/login')}>ورود</button> */}
                    <img src={logoheader} className='logo-size' onClick={() => history.push('/')} alt="عکس برای نمایش وجود ندارد" />
                </div>
                <div className='line-navbar' />
            </nav>

        </div>
    );
}

export default Header;