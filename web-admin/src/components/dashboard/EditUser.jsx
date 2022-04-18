import React from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useState } from 'react';
import HttpService from '../../service/HttpService';
import { toastError, toastSuccess } from '../../util/ToastUtil';



const EditUser = ({ userId }) => {

    const history = useHistory()
    const [userInfo, setUserInfo] = useState([])

    async function getViewUser() {

        try {
            const { data, status } = await HttpService.get(`/api/league/iam/loadUser/${userId}`)
            if (status === 200) {

                const buffer = Buffer(data.image.data);
                const blob = new Blob([buffer.buffer], { type: data.image.type });
                const url = URL.createObjectURL(blob);
                data.url = url

                setUserInfo(data)

                document.getElementById('organizationLevel').value= data.organizationLevel
                document.getElementById('companyName').value=data.companyName
                document.getElementById('sex').value=data.sex
            }

        } catch (error) {
            toastError(error.response.data.message);
        }

    }






    const handleUploadEquipmentFile = async (e) => {
        if (FileReader && e.target.files[0]) {
            var fr = new FileReader();
            fr.onload = function () {
                document.getElementById('needyImg').src = fr.result;
            }
            await fr.readAsDataURL(e.target.files[0]);
        }
    };



    async function handleUpdatUser(e) {
        e.preventDefault()

        const name = document.getElementById("name").value;
        const family = document.getElementById("family").value;
        const sex = document.getElementById("sex").value;
        const age = document.getElementById("age").value;
        const graduation = document.getElementById("graduation").value;
        const graduationField = document.getElementById("graduationField").value;
        const nationalId = document.getElementById("nationalId").value;
        const personnelId = document.getElementById("personnelId").value;
        const companyName = document.getElementById("companyName").value;
        const organizationLevel = document.getElementById("organizationLevel").value;
        const mobile = document.getElementById("mobile").value;
        const email = document.getElementById("email").value;
        const type = document.getElementById("organizationLevel").value;
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const rePassword = document.getElementById("reppassword").value;

        if (password !== rePassword) {
            toastError("تکرار رمز عبور با رمزعبور مطابقت ندارد")
            return
        }

        const body = {
            name, family, sex, age, graduation, graduationField,
            nationalId, personnelId, companyName, organizationLevel, mobile, email, type,
            username, password
        }


        const file = document.getElementById(`supplementaryFile1`).files[0];
        console.log('fileeeeeee' ,file);
        const data1 = new FormData();

        data1.append('body', JSON.stringify(body))
        data1.append('file', file)


        try {
            const { status } = await HttpService.put(`/api/league/iam/updateUser/${userId}`, data1)
            if (status === 200) {
                toastSuccess("کاربر با موفقیت ویرایش گردید")
                history.push('/dashbord/viewUser')
                // window.location.reload()
                

            }
        } catch (ex) {
            toastError(ex.response.data.message);
        }

    }




    useEffect(() => {
        getViewUser()
    }, [])



    return (

        <div className='container '>
            <div className='d-flex justify-content-center'  >
                <div className="d-flex flex-column mt-4 mb-4 p-4 border-0 border-radius-10px card1 card col-xl-10  ">

                    <h4 className='d-flex justify-content-center mt-4'>فرم ویرایش اطلاعات کاربر</h4>


                    <div className="userUpdateUpload">
                        <div className="col-12 col-sm-auto ">
                            <div className="mx-auto widthStyle" >
                                <div className="d-flex justify-content-center align-items-center rounded rounded-circle colorHeightStyle" >
                                    <img src={userInfo?.url} id='needyImg' className='rounded-circle' />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 mt-2 px-1 d-flex justify-content-start align-items-end">
                            <label className="d-flex align-items-center justify-content-center mb-0 p-2 text-white  border rounded-3  input-file" style={{ backgroundColor: 'rgb(15, 15, 240)' }}>
                                <i className="fa fa-fw fa-camera ms-1" aria-hidden="true"></i>
                                <input
                                    onChange={(e) => handleUploadEquipmentFile(e)}
                                    type="file"
                                    title="&nbsp;"
                                    accept="image/png, image/jpeg"
                                    className="d-none border-radius-05rem-0-0-05rem cursor-pointer"
                                    id="supplementaryFile1"
                                />
                                آپلود عکس
                            </label>
                        </div>
                    </div>


                    <div className='d-flex justify-content-center mt-4 row'>
                        <div className='col-12 col-md-4 col-lg-4'>
                            <div className='d-flex flex-column'>
                                <div className=' d-flex align-items-center justify-content-center'>
                                    <input class="pcenter my-0 flex-grow-1 py-2 px-1 mx-0 outline-none" placeholder='نام' id='name' defaultValue={userInfo.name} />
                                </div>
                            </div>
                        </div>

                        <div className='col-12 col-md-4 col-lg-4'>
                            <div className='d-flex flex-column'>
                                <div className=' d-flex align-items-center justify-content-center px-0'>
                                    <input class="pcenter my-0 flex-grow-1 py-2 px-1 mx-0 outline-none" placeholder='نام خانوادگی' id='family' defaultValue={userInfo.family} />
                                </div>
                            </div>
                        </div>


                        <div className='col-12 col-md-4 '>
                            <div className='d-flex flex-column'>
                                <div className=' d-flex align-items-center justify-content-center'>
                                    <select className="select pcenter my-0 flex-grow-1 py-2 px-1 mx-0 outline-none" id="sex"  >
                                        <option value="false">زن</option>
                                        <option value="true">مرد</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                    </div>


                    <div className='d-flex justify-content-center mt-3 row'>
                        <div className='col-12 col-md-4 '>
                            <div className='d-flex flex-column'>
                                <div className=' d-flex align-items-center justify-content-center'>
                                    <input class="pcenter my-0 flex-grow-1 py-2 px-1 mx-0 outline-none" placeholder='سن ' id="age" defaultValue={userInfo.age} />
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-md-4 col-lg-4'>
                            <div className='d-flex flex-column'>
                                <div className=' d-flex align-items-center justify-content-center'>
                                    <input class="pcenter my-0 flex-grow-1 py-2 px-1 mx-0 outline-none" placeholder='تحصیلات ' id='graduation' defaultValue={userInfo.graduation} />
                                </div>
                            </div>
                        </div>

                        <div className='col-12 col-md-4 col-lg-4'>
                            <div className='d-flex flex-column'>
                                <div className=' d-flex align-items-center justify-content-center'>
                                    <input class="pcenter my-0 flex-grow-1 py-2 px-1 mx-0 outline-none" placeholder=' رشته تحصیلی' id='graduationField' defaultValue={userInfo.graduationField} />
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className='d-flex justify-content-between mt-3 row'>
                        <div className='col-12 col-md-4 col-lg-4'>
                            <div className='d-flex flex-column'>
                                <div className=' d-flex align-items-center justify-content-center'>
                                    <input class="pcenter my-0 flex-grow-1 py-2 px-1 mx-0 outline-none" placeholder='کد ملی ' id='nationalId' defaultValue={userInfo.nationalId} />
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-md-4 col-lg-4'>
                            <div className='d-flex flex-column'>
                                <div className=' d-flex align-items-center justify-content-center'>
                                    <input class="pcenter my-0 flex-grow-1 py-2 px-1 mx-0 outline-none" placeholder='کد پرسنلی ' id='personnelId' defaultValue={userInfo.personnelId} />
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-md-4 col-lg-4'>
                            <div className='d-flex flex-column'>
                                <div className=' d-flex align-items-center justify-content-center'>
                                    <select className="select pcenter my-0 flex-grow-1 py-2 px-1 mx-0 outline-none" id="companyName">
                                        <option className='outline-none border-0 bg-gray' selected value="1" disabled>اسم شرکت</option>
                                        <option className='outline-none border-0 ' value="BSM">بهسازان ملت</option>
                                        <option className='outline-none border-0 ' value="BPM">به پرداخت ملت</option>
                                        <option className='outline-none border-0 ' value='SYS'>مهندسی سیستم یاس</option>
                                        <option className='outline-none border-0 ' value='YaasSie'>مهندسی صنایع یاس ارغوانی</option>
                                        <option className='outline-none border-0 ' value='SITS'>زیرساخت امن خدمات تراکنشی</option>
                                        <option className='outline-none border-0 ' value='SHGH'>مهندسی نرم افزار شقایق</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className='d-flex justify-content-between mt-3 row'>
                        <div className='col-12 col-md-4 col-lg-4'>
                            <div className=' d-flex align-items-center justify-content-center'>
                                <select className="select pcenter my-0 flex-grow-1 py-2 px-1 mx-0 outline-none" id="organizationLevel"  >
                                    <option value="ceo">مدیرعامل</option>
                                    <option value="admin">ادمین</option>
                                    <option value="envoy">نماینده شرکت</option>
                                </select>
                            </div>
                        </div>
                        <div className='col-12 col-md-4 '>
                            <div className='d-flex flex-column'>
                                <div className=' d-flex align-items-center justify-content-center'>
                                    <input class="pcenter my-0 flex-grow-1 py-2 px-1 mx-0 outline-none" placeholder='موبایل  ' id='mobile' defaultValue={userInfo.mobile} />
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-md-4'>
                            <div className='d-flex flex-column'>
                                <div className=' d-flex align-items-center justify-content-center'>
                                    <input class="pcenter my-0 flex-grow-1 py-2 px-1 mx-0 outline-none" type='email' placeholder='ایمیل ' id='email' defaultValue={userInfo.email} />
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className='d-flex justify-content-between mt-3 row'>

                        <div className='col-12 col-md-4 col-lg-4'>
                            <div className='d-flex align-items-center  justify-content-center'>
                                <input class="pcenter my-0 flex-grow-1 py-2 px-1 mx-0 outline-none" placeholder=' نام کاربری' id='username' defaultValue={userInfo.username} />
                            </div>
                        </div>
                        <div className='col-12 col-md-4 col-lg-4'>
                            <div className='d-flex align-items-center justify-content-center'>
                                <input type='password' class="pcenter my-0 flex-grow-1 py-2 px-1 mx-0 outline-none" placeholder=' رمز عبور' id='password' defaultValue={userInfo.password} />
                            </div>
                        </div>
                        <div className='col-12 col-md-4 col-lg-4'>
                            <div className='d-flex align-items-center justify-content-center'>
                                <input type='password' class="pcenter my-0 flex-grow-1 py-2 px-1 mx-0 outline-none" placeholder=' تکرار رمز عبور' id='reppassword' defaultValue={userInfo.rePassword} />
                            </div>
                        </div>

                    </div>

                    <div className='d-flex justify-content-center mt-3 row'>

                        <div className=' d-flex justify-content-center col-12 col-md-6 col-lg-3'>
                            <button className='formbutton2  flex-grow-1 mx-4 outline-0' onClick={handleUpdatUser} > ثبت </button>
                        </div>
                    </div>

                </div>
            </div>


        </div>

    );
}

export default EditUser;