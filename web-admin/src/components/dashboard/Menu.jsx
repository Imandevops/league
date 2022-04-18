import React, { useContext } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Accordion from '../common/Accordion';
import MainContext from '../context/MainContext';
import baseInfoLogo from "../../static/image/baseInfoLogo.png";
import managementUserLogo from "../../static/image/managementUserLogo.png";
import managementAccesLogo from "../../static/image/managementAccesLogo.png";
import managementCharityLogo from "../../static/image/managementCharityLogo.png";
import managementPlansLogo from "../../static/image/managementPlansLogo.png";
import managementAccountentLogo from "../../static/image/managementAccountentLogo.png";
import managementReportLogo from "../../static/image/managementReportLogo.png";

const Menu = ({ userChallenges, allChallenges }) => {

    const { info } = useContext(MainContext)

    const location = useLocation()

    return (
        <div className='menu'>

            <Accordion state={'menu'} className="text-dark" title="بررسی طرح‌ها " logoImage={managementUserLogo} >
                <div className="d-flex flex-column mt-1 me-1">
                    <NavLink to="/dashbord/planReview" activeClassName="text-primary"> مشاهده طرح‌ها </NavLink>
                </div>
            </Accordion>

            <Accordion state={'menu'} id='accordin2' className="" title=" تعریف داوران " logoImage={baseInfoLogo} >
                <div className="d-flex flex-column mt-1 me-1">
                    <NavLink to="/dashbord/judges" activeClassName="text-primary"> مدیریت داوران </NavLink>
                </div>
            </Accordion>

            {/* <Accordion state={'menu'} className="" title=" تعریف پرسشنامه داوری " logoImage={managementAccesLogo} >

            </Accordion>


            <Accordion state={'menu'} className="" title=" ارسال پرسشنامه داوری " logoImage={managementCharityLogo} >

            </Accordion> */}



            <Accordion state={'menu'} className="" title=" محتوای پورتال " logoImage={managementAccountentLogo} >
                <div className="d-flex flex-column mt-1 me-1">
                    <NavLink to="/dashbord/winners" activeClassName="text-primary"> عکس برندگان </NavLink>
                </div>
                <div className="d-flex flex-column mt-3 me-1">
                    <NavLink to="/dashbord/textInfo" activeClassName="text-primary"> اینفوگرافی و جداول </NavLink>
                </div>
                <div className="d-flex flex-column mt-3 me-1">
                    <NavLink to="/dashbord/news" activeClassName="text-primary"> اخبار </NavLink>
                </div>
                <div className="d-flex flex-column mt-3 me-1">
                    <NavLink to="/dashbord/aboutLeague" activeClassName="text-primary"> درباره لیگ </NavLink>
                </div>
                <div className="d-flex flex-column mt-3 me-1">
                    <NavLink to="/dashbord/gallery" activeClassName="text-primary"> گالری تصاویر </NavLink>
                </div>
                <div className="d-flex flex-column mt-3 me-1">
                    <NavLink to="/dashbord/infoPic" activeClassName="text-primary"> معرفی لیگ - اینفوگرافی </NavLink>
                </div>
            </Accordion>

            <Accordion state={'menu'} className="" title=" مدیریت دسترسی" logoImage={managementReportLogo} >
                <div className="d-flex flex-column mt-1 me-1">
                    <NavLink to="/dashbord/userDefinition" activeClassName="text-primary"> تعریف کاربر  </NavLink>
                </div>
                <div className="d-flex flex-column mt-3 me-1">
                    <NavLink to='/dashbord/viewUser' activeClassName="text-primary"> مشاهده کاربر  </NavLink>
                </div>
            </Accordion>

            <Accordion state={'menu'} className="" title="پروفایل صاحبان طرح" logoImage={managementReportLogo} >
                <div className="d-flex flex-column mt-1 me-1">
                    <NavLink to="/dashbord/PlanOwners" activeClassName="text-primary">   پروفایل صاحبان طرح  </NavLink>
                </div>
               
            </Accordion>

            <Accordion state={'menu'} className="" title="پروفایل برگزیده ها" logoImage={managementReportLogo} >
                <div className="d-flex flex-column mt-1 me-1">
                    <NavLink to="/dashbord/SelectedProfiles" activeClassName="text-primary">   پروفایل برگزیده ها  </NavLink>
                </div>
               
            </Accordion>

        </div>
    );
}

export default Menu;