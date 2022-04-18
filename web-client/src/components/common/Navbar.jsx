import React from 'react';
import { useHistory, useLocation } from 'react-router';
import logoheader from '../../static/images/logoheader.png';

const Navbar = () => {

    let adminFull = localStorage.getItem('name');
    const location = useLocation()
    const history = useHistory()

    return (
        <nav className='navbar navbar-light pb-0 container'>
            <div className='container d-block'>
                <div className='d-flex justify-content-between align-items-center'>
                    <div className="dropdown  ">
                        <button className="btn menu-btn " type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            <p className=' px-2 py-1 mb-0 '> منوی کاربری </p>
                        </button>
                        <ul className="dropdown-menu dropdown-rtl px-0" aria-labelledby="dropdownMenuButton1">
                            <li><a className="dropdown-item text-end" href="#">{adminFull}</a></li>
                            <li><a className="dropdown-item text-end" href="#">{localStorage.getItem('companyNamePer')}</a></li>
                            {location.pathname.includes('/panelRouter/createPlan') ? <li><a className="dropdown-item text-end" href="/panelRouter/panel">مشاهده طرح‌ها </a></li> : null}
                            <li><a className="dropdown-item text-end" href="#">تنظیمات</a></li>
                            <li><a className="dropdown-item text-end" href="#" onClick={() => localStorage.clear()}>خروج</a></li>
                        </ul>
                    </div>
                    <img className=" imgheader-size" src={logoheader} alt="" onClick={() => history.push('/')} />
                </div>
            </div>
        </nav>

    );
}

export default Navbar;