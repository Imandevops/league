import React from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../../static/image/logo-header.png';

const Header = () => {
    const history = useHistory()
function handleClose() {
    localStorage.clear()
    history.push('/')
}
    return (
        <header className='header-theme'>
            <div className='d-flex justify-content-between py-1'>
                <div className="d-flex align-items-center align-baseline">
                    <i className="fa fa-user text-white fa-2x px-2 py-1 me-3 rounded-pill user-logo-bg"></i>
                    <div className='d-flex  justify-content-between' >
                        <p className="text-dark me-2 ms-0 mt-3 text-white"> {localStorage.getItem('name')} {localStorage.getItem('family')} </p>
                        <p className=" me-2 mt-3 cursor-pointer  px-0 " >|</p>
                        <p className=" me-2 mt-3 cursor-pointer  px-0 "  onClick={handleClose} style={{color:'rgb(74 127 185)' }}>خروج</p>
                    </div>
                </div>
                <img className="p-0 mt-1 mb-1 ms-3  " style={{ maxHeight: '55px' }} src={logo} alt="لوگوی لیگ" />
            </div>
        </header>);
}

export default Header;