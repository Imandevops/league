import contactuser from '../../static/image/contactuser.png';
import { useHistory } from "react-router";
import HttpService from "../../service/HttpService";
import ViewUserDialog from "../dialogs/ViewUserDialog";
import React, { useContext, useEffect, useState } from 'react';
import MainContext from '../context/MainContext';

const ViewUser = () => {

    const { setLoadingDialog } = useContext(MainContext)
    const history = useHistory()
    const [userView, setUserView] = useState([]);
    const [selected, setSelected] = useState();
    const [viewUserDialog, setViewUserDialog] = useState()
    const [userIdForDlg, setUserIdForDlg] = useState()


    async function getViewUsers() {
        setLoadingDialog(true)
        if (selected) {
            try {
                const { data, status } = await HttpService.get(`/api/league/iam/loadUsers?companyName=${selected}`)
                console.log('fooooooooo', data);
                if (status === 200) {
                    for (let obj of data) {
                        const buffer = Buffer(obj.image.data);
                        const blob = new Blob([buffer.buffer], { type: obj.image.type });
                        const url = URL.createObjectURL(blob);
                        obj.url = url
                    }
                    setUserView(data)
                    console.log('dataaaaaaaaaa', data);
                }
            } catch (error) {

            }
        }
        setLoadingDialog(false)
    }


    async function HandleSelectedValue(e) {
        setSelected(e.target.value)
    }


    const handleContinue = (userId) => {
        history.push(`/dashbord/viewUserId/${userId}`)
    }

    

    const handleLoadViewUserDialog = (e, userId) => {
        e.preventDefault()
        setViewUserDialog(true)
        setUserIdForDlg(userId)
    }


    useEffect(() => {
        getViewUsers()
    }, [selected])


    return (
        <div className="widgetLg">
            {viewUserDialog ?
                <ViewUserDialog
                    userId={userIdForDlg}
                    showDialog={viewUserDialog}
                    closeDialog={() => setViewUserDialog(false)}
                /> : null}


            <h3 className="widgetLgTitle">لیست کاربران</h3>

            <div className="col-12 col-sm-12 mt-2 px-1 d-flex justify-content-center mb-5">
                <select className="selectpicker flex-grow-1 cursor-pointer p-1 border outline-none" aria-label="Default select example" id="field" name="field" onChange={(e) => HandleSelectedValue(e)} >
                    <option value='0'>شرکت مربوطه را انتخاب کنید </option>
                    <option value='BPM'>به‌پرداخت ملت</option>
                    <option value='BSM'>بهسازان ملت</option>
                    <option value='SYS'>مهندسی سیستم یاس</option>
                    <option value='YaasSie'>مهندسی صنایع یاس ارغوانی</option>
                    <option value='SITS'>زیرساخت امن خدمات تراکنشی</option>
                    <option value='SHGH'>مهندسی نرم افزار شقایق</option>
                </select>
            </div>

            <table className="widgetLgTable  mt-5">
                <tr className="widgetLgTr">
                    <th className="widgetLgTh   text-end"> مدیر عامل</th>
                    <th className="widgetLgTh ">شرکت </th>
                    <th className="widgetLgTh ">سمت </th>
                    <th className="widgetLgTh ">تغییر </th>
                </tr>

               
                    {userView.filter((userView) => userView?.organizationLevel === "ceo").map((p, index) => (
                        <tr className="widgetLgTr pb-5 ">
                            <td className="widgetLgTd text-end " style={{ paddingRight: "25px" }}>
                                <img
                                    src={p.url}
                                    alt=""
                                    className="widgetLgImg mb-2 ms-2"
                                />
                                <span className='mb-2'>{`${p.name} ${p.family}`}</span>
                            </td>
                            <td className="widgetLgTd mb-2">{p.companyNamePer}</td>
                            <td className="widgetLgTd mb-2">{p.organizationLevelName}</td>
                            <td className="widgetLgTd mb-2">
                                <button className='Approved mb-2' type="Approved" onClick={e => handleLoadViewUserDialog(e, p.userId)} > نمایش</button> | <button className='Pending mb-2' type="Pending" onClick={() => handleContinue(p.userId)} > ویرایش</button>
                            </td>
                        </tr>
                    ))}
                </table>

                <table className="widgetLgTable mt-5">
                    <tr className="widgetLgTr">
                        <th className="widgetLgTh  text-end"> نماینده شرکت</th>
                        <th className="widgetLgTh ">شرکت </th>
                        <th className="widgetLgTh ">سمت </th>
                        <th className="widgetLgTh ">تغییر </th>
                    </tr>
                    {userView.filter((userView) => userView?.organizationLevel === "envoy").map((p, index) => (
                        <tr className="widgetLgTr pb-5 ">
                            <td className="widgetLgTd text-end " style={{ paddingRight: "25px" }}>
                                <img
                                    src={p.url}
                                    alt=""
                                    className="widgetLgImg mb-2 ms-2"
                                />
                                <span className='mb-2'>{`${p.name} ${p.family}`}</span>
                            </td>
                            <td className="widgetLgTd mb-2 ">{p.companyNamePer}</td>
                            <td className="widgetLgTd mb-2">{p.organizationLevelName}</td>
                            <td className="widgetLgTd mb-2">
                                <button className='Approved mb-2 ' type="Approved" onClick={e => handleLoadViewUserDialog(e, p.userId)} > نمایش</button> | <button className='Pending mb-2' type="Pending" onClick={() => handleContinue(p.userId)} > ویرایش</button>
                            </td>
                        </tr>
                    ))}

                
            </table>


        </div>
    );
}
export default ViewUser;
