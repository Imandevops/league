import React, { useEffect, useState } from 'react';
import image2 from '../../static/image/image2.png';
import HttpService from '../../service/HttpService';
import { toastSuccess } from '../../util/ToastUtil';
import { useHistory } from 'react-router';

const NewsCorrection = ({ newsId }) => {
    const history = useHistory()
    const [news, setNews] = useState()
    var picture1;

    async function getnews() {

        try {
            const { data, status } = await HttpService.get(`/api/league/context/news/${newsId}`)
            if (status === 200) {
                console.log('dataaaaaaaa', data);
                data.url = []
                for (let i = 0; i < data.images.length; i++) {
                    const buffer = Buffer(data.images[i].data);
                    const blob = new Blob([buffer.buffer], { type: data.images[i].type });
                    const url = URL.createObjectURL(blob);
                    data.url.push({ fileName: data.images[i].fileName, filePath: url })

                }
                setNews(data)
                console.log('dataaaaaaaa2', data);
            }

        } catch (error) {
        }
    }



    async function handleGoToPreview() {
        
        // if (!document.getElementById(`supplementaryFile1`).files[0]?.name){
        //     alert( 'آپلود کردن عکس اصلی خبر اجباری است !')
        //     return
        // }

        const newsText = document.getElementById('content-description1').value;
        const newsTitle = document.getElementById('newsTitle').value;
        const newsDate = new Date().getTime()
       
        if (document.getElementById(`supplementaryFile1`).files[0]?.name)
        {

            var element = document.getElementById('supplementaryFile1');
            var file = element.files[0];
            var blob = file.slice(0, file.size, 'image/png');
            picture1 = new File([blob], 'first.png', { type: 'image/png' });
        }
        console.log(document.getElementById(`supplementaryFile1`).files[0], '(document.getElementById(`supplementaryFile1`).files[0]');

        const picture2 = document.getElementById(`supplementaryFile2`).files[0];
        const picture3 = document.getElementById(`supplementaryFile3`).files[0];
        const picture4 = document.getElementById(`supplementaryFile4`).files[0];
        const picture5 = document.getElementById(`supplementaryFile5`).files[0];
        const picture6 = document.getElementById(`supplementaryFile6`).files[0];
        const picture7 = document.getElementById(`supplementaryFile7`).files[0];
        const picture8 = document.getElementById(`supplementaryFile8`).files[0];
        const picture9 = document.getElementById(`supplementaryFile9`).files[0];
        const picture10 = document.getElementById(`supplementaryFile10`).files[0];
        const picture11 = document.getElementById(`supplementaryFile11`).files[0];
        const picture12 = document.getElementById(`supplementaryFile12`).files[0];

        const body = {
            newsText, newsTitle, newsDate
        }

        const data1 = new FormData();
        data1.append('body', JSON.stringify(body))
        data1.append('pic', picture1)
        data1.append('pic', picture2)
        data1.append('pic', picture3)
        data1.append('pic', picture4)
        data1.append('pic', picture5)
        data1.append('pic', picture6)
        data1.append('pic', picture7)
        data1.append('pic', picture8)
        data1.append('pic', picture9)
        data1.append('pic', picture10)
        data1.append('pic', picture11)
        data1.append('pic', picture12)

        try {
            const { status } = await HttpService.put(`/api/league/context/news/${newsId}`, data1)
            if (status === 204) {
                toastSuccess("ویرایش با موفقیت انجام شد")
                history.push('/dashbord/news')
            }
        } catch (ex) {
        }
       
    }


    const handleUploadEquipmentFile1 = async (e) => {
        if (FileReader && e.target.files[0]) {
            var fr = new FileReader();
            fr.onload = function () {
                document.getElementById('news1Img').src = fr.result;
            }
            // e.target.files[0].name === 'first.png'
            await fr.readAsDataURL(e.target.files[0]);
        }
    };

    const handleUploadEquipmentFile2 = async (e) => {
        if (FileReader && e.target.files[0]) {
            var fr = new FileReader();
            fr.onload = function () {
                document.getElementById('news2Img').src = fr.result;
            }
            await fr.readAsDataURL(e.target.files[0]);
        }
    };

    const handleUploadEquipmentFile3 = async (e) => {
        if (FileReader && e.target.files[0]) {
            var fr = new FileReader();
            fr.onload = function () {
                document.getElementById('news3Img').src = fr.result;
            }
            await fr.readAsDataURL(e.target.files[0]);
        }
    };

    const handleUploadEquipmentFile4 = async (e) => {
        if (FileReader && e.target.files[0]) {
            var fr = new FileReader();
            fr.onload = function () {
                document.getElementById('news4Img').src = fr.result;
            }
            await fr.readAsDataURL(e.target.files[0]);
        }
    };

    const handleUploadEquipmentFile5 = async (e) => {
        if (FileReader && e.target.files[0]) {
            var fr = new FileReader();
            fr.onload = function () {
                document.getElementById('news5Img').src = fr.result;
            }
            await fr.readAsDataURL(e.target.files[0]);
        }
    };

    const handleUploadEquipmentFile6 = async (e) => {
        if (FileReader && e.target.files[0]) {
            var fr = new FileReader();
            fr.onload = function () {
                document.getElementById('news6Img').src = fr.result;
            }
            await fr.readAsDataURL(e.target.files[0]);
        }
    };

    const handleUploadEquipmentFile7 = async (e) => {
        if (FileReader && e.target.files[0]) {
            var fr = new FileReader();
            fr.onload = function () {
                document.getElementById('news7Img').src = fr.result;
            }
            await fr.readAsDataURL(e.target.files[0]);
        }
    };

    const handleUploadEquipmentFile8 = async (e) => {
        if (FileReader && e.target.files[0]) {
            var fr = new FileReader();
            fr.onload = function () {
                document.getElementById('news8Img').src = fr.result;
            }
            await fr.readAsDataURL(e.target.files[0]);
        }
    };

    const handleUploadEquipmentFile9 = async (e) => {
        if (FileReader && e.target.files[0]) {
            var fr = new FileReader();
            fr.onload = function () {
                document.getElementById('news9Img').src = fr.result;
            }
            await fr.readAsDataURL(e.target.files[0]);
        }
    };

    const handleUploadEquipmentFile10 = async (e) => {
        if (FileReader && e.target.files[0]) {
            var fr = new FileReader();
            fr.onload = function () {
                document.getElementById('news10Img').src = fr.result;
            }
            await fr.readAsDataURL(e.target.files[0]);
        }
    };

    const handleUploadEquipmentFile11 = async (e) => {
        if (FileReader && e.target.files[0]) {
            var fr = new FileReader();
            fr.onload = function () {
                document.getElementById('news11Img').src = fr.result;
            }
            await fr.readAsDataURL(e.target.files[0]);
        }
    };

    const handleUploadEquipmentFile12 = async (e) => {
        if (FileReader && e.target.files[0]) {
            var fr = new FileReader();
            fr.onload = function () {
                document.getElementById('news12Img').src = fr.result;
            }
            await fr.readAsDataURL(e.target.files[0]);
        }
    };

    useEffect(() => {
        getnews()
    }, [])


    return (

        <div className='container'>

            <p className='font-weight-bolder mt-3 mb-3 h5 m-2'> اخبار لیگ</p>

            <div className="d-flex align-items-center mb-1 alert alert-info border-0 " style={{ backgroundColor: '#7c9ec53b', borderRadius: '10px' }}>
                <i className="fa ms-2 fa-exclamation-circle text-danger fs-5" aria-hidden="true"></i>
                <span className="text-center mb-0 me-1 " >لطفا تمامی عکس ها مجددا بارگذاری شوند.</span>
            </div>

            <div className="d-flex flex-column align-items-end my-3 m-2">
                <div className="d-flex align-self-start align-items-center">
                    <p className='mb-0'> لیست عکس‌های بارگذاری شده قبلی</p><i className="fa fa-arrow-left me-2" style={{color:'#195FAD'}} aria-hidden="true"></i>
                </div>
                {news?.url?.map((p, index) => (
                    <a href={p.filePath} className='d-inline-block text-primary text-uppercase' download>  {p.fileName} <i class="fa fa-circle" aria-hidden="true" className='fs-5'></i></a>
                ))}
            </div>

            <label className=' mt-3 mb-3 h6 m-2'>  عنوان خبر  :</label>
            <input className='col-md-12 col-12 mb-2 border p-2 newsTitleStyle' defaultValue={news?.newsTitle} id='newsTitle' />

            <label className=' mt-3 mb-3 h6 m-2'>  متن خبر  :</label>
            <textarea className='col-md-12 col-12 border p-3 contentTextArea' defaultValue={news?.newsText} id='content-description1' />

            <label className=' mt-3 mb-3 h6 m-2'>  آرشیو عکس خبر   :</label>
            <div className='d-flex'>
                <div className="col-md-3 col-3 align-items-start  justify-content-center">
                    <div className="d-flex justify-content-center m-1 align-items-start " >
                        <img src={image2} id='news1Img' className=' ' style={{ height: '177px', objectFit: 'contain', borderRadius: '10px' }} />
                    </div>

                    <div className="mt-2 px-1 d-flex justify-content-center align-items-center ">
                        <label className="d-flex align-items-center   justify-content-center mb-0 p-2 cursor-pointer w-100 uploadPicStyle3  ">
                            <i className="fa fa-fw fa-camera ms-1" aria-hidden="true"></i>
                            <input
                                onChange={(e) => handleUploadEquipmentFile1(e)}
                                type="file"
                                title="&nbsp;"
                                accept="image/png, image/jpeg"
                                className="d-none border-radius-05rem-0-0-05rem cursor-pointer"
                                id="supplementaryFile1"
                            />
                            آپلود عکس اصلی خبر
                        </label>
                    </div>
                </div>

                <div className=" col-md-3 col-3 align-items-start  justify-content-center">
                    <div className="d-flex justify-content-center m-1  align-items-start  " >
                        <img src={image2} id='news2Img' className=' ' style={{ height: '177px', objectFit: 'contain', borderRadius: '10px' }} />
                    </div>

                    <div className="mt-2 px-1 d-flex justify-content-center align-items-center ">
                        <label className="d-flex align-items-center justify-content-center mb-0 p-2 cursor-pointer w-100  uploadPicStyle3  ">
                            <i className="fa fa-fw fa-camera ms-1" aria-hidden="true"></i>
                            <input
                                onChange={(e) => handleUploadEquipmentFile2(e)}
                                type="file"
                                title="&nbsp;"
                                accept="image/png, image/jpeg"
                                className="d-none border-radius-05rem-0-0-05rem cursor-pointer"
                                id="supplementaryFile2"
                            />
                            آپلود عکس 2
                        </label>
                    </div>
                </div>

                <div className=" col-md-3 col-3 align-items-start  justify-content-center">
                    <div className="d-flex justify-content-center m-1 align-items-start  " >
                        <img src={image2} id='news3Img' className=' ' style={{ height: '177px', objectFit: 'contain', borderRadius: '10px' }} />
                    </div>

                    <div className="mt-2 px-1 d-flex justify-content-center align-items-center ">
                        <label className="d-flex align-items-center justify-content-center mb-0 p-2 cursor-pointer w-100  uploadPicStyle3  ">
                            <i className="fa fa-fw fa-camera ms-1" aria-hidden="true"></i>
                            <input
                                onChange={(e) => handleUploadEquipmentFile3(e)}
                                type="file"
                                title="&nbsp;"
                                accept="image/png, image/jpeg"
                                className="d-none border-radius-05rem-0-0-05rem cursor-pointer"
                                id="supplementaryFile3"
                            />
                            آپلود عکس 3
                        </label>
                    </div>
                </div>


                <div className=" col-md-3 col-3 align-items-start  justify-content-center">
                    <div className="d-flex justify-content-center m-1 align-items-start  " >
                        <img src={image2} id='news4Img' className=' ' style={{ height: '177px', objectFit: 'contain', borderRadius: '10px' }} />
                    </div>

                    <div className="mt-2 px-1 d-flex justify-content-center align-items-center ">
                        <label className="d-flex align-items-center   justify-content-center mb-0 p-2 cursor-pointer w-100 uploadPicStyle3  ">
                            <i className="fa fa-fw fa-camera ms-1" aria-hidden="true"></i>
                            <input
                                onChange={(e) => handleUploadEquipmentFile4(e)}
                                type="file"
                                title="&nbsp;"
                                accept="image/png, image/jpeg"
                                className="d-none border-radius-05rem-0-0-05rem cursor-pointer"
                                id="supplementaryFile4"
                            />
                            آپلود عکس 4
                        </label>
                    </div>
                </div>

            </div>



            <div className='d-flex'>

                <div className=" col-md-3 col-3 align-items-start  justify-content-center">
                    <div className="d-flex justify-content-center m-1  align-items-start  " >
                        <img src={image2} id='news5Img' className=' ' style={{ height: '177px', objectFit: 'contain', borderRadius: '10px' }} />
                    </div>

                    <div className="mt-2 px-1 d-flex justify-content-center align-items-center ">
                        <label className="d-flex align-items-center justify-content-center mb-0 p-2 cursor-pointer w-100  uploadPicStyle3  ">
                            <i className="fa fa-fw fa-camera ms-1" aria-hidden="true"></i>
                            <input
                                onChange={(e) => handleUploadEquipmentFile5(e)}
                                type="file"
                                title="&nbsp;"
                                accept="image/png, image/jpeg"
                                className="d-none border-radius-05rem-0-0-05rem cursor-pointer"
                                id="supplementaryFile5"
                            />
                            آپلود عکس 5
                        </label>
                    </div>
                </div>

                <div className=" col-md-3 col-3 align-items-start  justify-content-center">
                    <div className="d-flex justify-content-center m-1 align-items-start  " >
                        <img src={image2} id='news6Img' className=' ' style={{ height: '177px', objectFit: 'contain', borderRadius: '10px' }} />
                    </div>

                    <div className="mt-2 px-1 d-flex justify-content-center align-items-center ">
                        <label className="d-flex align-items-center justify-content-center mb-0 p-2 cursor-pointer w-100  uploadPicStyle3  ">
                            <i className="fa fa-fw fa-camera ms-1" aria-hidden="true"></i>
                            <input
                                onChange={(e) => handleUploadEquipmentFile6(e)}
                                type="file"
                                title="&nbsp;"
                                accept="image/png, image/jpeg"
                                className="d-none border-radius-05rem-0-0-05rem cursor-pointer"
                                id="supplementaryFile6"
                            />
                            آپلود عکس 6
                        </label>
                    </div>
                </div>


                <div className=" col-md-3 col-3 align-items-start  justify-content-center">
                    <div className="d-flex justify-content-center m-1 align-items-start  " >
                        <img src={image2} id='news7Img' className=' ' style={{ height: '177px', objectFit: 'contain', borderRadius: '10px' }} />
                    </div>

                    <div className="mt-2 px-1 d-flex justify-content-center align-items-center ">
                        <label className="d-flex align-items-center justify-content-center mb-0 p-2 cursor-pointer w-100  uploadPicStyle3  ">
                            <i className="fa fa-fw fa-camera ms-1" aria-hidden="true"></i>
                            <input
                                onChange={(e) => handleUploadEquipmentFile7(e)}
                                type="file"
                                title="&nbsp;"
                                accept="image/png, image/jpeg"
                                className="d-none border-radius-05rem-0-0-05rem cursor-pointer"
                                id="supplementaryFile7"
                            />
                            آپلود عکس 7
                        </label>
                    </div>
                </div>


                <div className=" col-md-3 col-3 align-items-start  justify-content-center">
                    <div className="d-flex justify-content-center m-1 align-items-start  " >
                        <img src={image2} id='news8Img' className=' ' style={{ height: '177px', objectFit: 'contain', borderRadius: '10px' }} />
                    </div>

                    <div className="mt-2 px-1 d-flex justify-content-center align-items-center ">
                        <label className="d-flex align-items-center justify-content-center mb-0 p-2 cursor-pointer w-100  uploadPicStyle3  ">
                            <i className="fa fa-fw fa-camera ms-1" aria-hidden="true"></i>
                            <input
                                onChange={(e) => handleUploadEquipmentFile8(e)}
                                type="file"
                                title="&nbsp;"
                                accept="image/png, image/jpeg"
                                className="d-none border-radius-05rem-0-0-05rem cursor-pointer"
                                id="supplementaryFile8"
                            />
                            آپلود عکس 8
                        </label>
                    </div>
                </div>

            </div>



            <div className='d-flex'>

                <div className=" col-md-3 col-3 align-items-start  justify-content-center">
                    <div className="d-flex justify-content-center m-1  align-items-start  " >
                        <img src={image2} id='news9Img' className=' ' style={{ height: '177px', objectFit: 'contain', borderRadius: '10px' }} />
                    </div>

                    <div className="mt-2 px-1 d-flex justify-content-center align-items-center ">
                        <label className="d-flex align-items-center justify-content-center mb-0 p-2 cursor-pointer w-100  uploadPicStyle3  ">
                            <i className="fa fa-fw fa-camera ms-1" aria-hidden="true"></i>
                            <input
                                onChange={(e) => handleUploadEquipmentFile9(e)}
                                type="file"
                                title="&nbsp;"
                                accept="image/png, image/jpeg"
                                className="d-none border-radius-05rem-0-0-05rem cursor-pointer"
                                id="supplementaryFile9"
                            />
                            آپلود عکس 9
                        </label>
                    </div>
                </div>

                <div className=" col-md-3 col-3 align-items-start  justify-content-center">
                    <div className="d-flex justify-content-center m-1 align-items-start  " >
                        <img src={image2} id='news10Img' className=' ' style={{ height: '177px', objectFit: 'contain', borderRadius: '10px' }} />
                    </div>

                    <div className="mt-2 px-1 d-flex justify-content-center align-items-center ">
                        <label className="d-flex align-items-center justify-content-center mb-0 p-2 cursor-pointer w-100  uploadPicStyle3  ">
                            <i className="fa fa-fw fa-camera ms-1" aria-hidden="true"></i>
                            <input
                                onChange={(e) => handleUploadEquipmentFile10(e)}
                                type="file"
                                title="&nbsp;"
                                accept="image/png, image/jpeg"
                                className="d-none border-radius-05rem-0-0-05rem cursor-pointer"
                                id="supplementaryFile10"
                            />
                            آپلود عکس 10
                        </label>
                    </div>
                </div>


                <div className=" col-md-3 col-3 align-items-start  justify-content-center">
                    <div className="d-flex justify-content-center m-1 align-items-start  " >
                        <img src={image2} id='news11Img' className=' ' style={{ height: '177px', objectFit: 'contain', borderRadius: '10px' }} />
                    </div>

                    <div className="mt-2 px-1 d-flex justify-content-center align-items-center ">
                        <label className="d-flex align-items-center justify-content-center mb-0 p-2 cursor-pointer w-100  uploadPicStyle3  ">
                            <i className="fa fa-fw fa-camera ms-1" aria-hidden="true"></i>
                            <input
                                onChange={(e) => handleUploadEquipmentFile11(e)}
                                type="file"
                                title="&nbsp;"
                                accept="image/png, image/jpeg"
                                className="d-none border-radius-05rem-0-0-05rem cursor-pointer"
                                id="supplementaryFile11"
                            />
                            آپلود عکس 11
                        </label>
                    </div>
                </div>


                <div className=" col-md-3 col-3 align-items-start  justify-content-center">
                    <div className="d-flex justify-content-center m-1 align-items-start  " >
                        <img src={image2} id='news12Img' className=' ' style={{ height: '177px', objectFit: 'contain', borderRadius: '10px' }} />
                    </div>

                    <div className="mt-2 px-1 d-flex justify-content-center align-items-center ">
                        <label className="d-flex align-items-center justify-content-center mb-0 p-2 cursor-pointer w-100  uploadPicStyle3  ">
                            <i className="fa fa-fw fa-camera ms-1" aria-hidden="true"></i>
                            <input
                                onChange={(e) => handleUploadEquipmentFile12(e)}
                                type="file"
                                title="&nbsp;"
                                accept="image/png, image/jpeg"
                                className="d-none border-radius-05rem-0-0-05rem cursor-pointer"
                                id="supplementaryFile12"
                            />
                            آپلود عکس 12
                        </label>
                    </div>
                </div>

            </div>




            <div className='d-flex justify-content-end mt-4 ms-1 mb-5'>
                <button className='buttonViewStyle px-4' onClick={handleGoToPreview} > ثبت </button>
            </div>

        </div>





    );
}

export default NewsCorrection;