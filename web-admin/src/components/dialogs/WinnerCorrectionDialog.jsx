import React from 'react';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import HttpService from '../../service/HttpService';
import { toastSuccess } from '../../util/ToastUtil';
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { getAllDatesInRange } from 'react-multi-date-picker';




const WinnerCorrectionDialog = ({ showDialog, closeDialog, url, planEnvoy, rank, companyName, team, leagueRound, winnerId ,abb }) => {


    
    
    const [x, setX] = useState([])
    const history = useHistory()

   

    function handleAddRow() {
        let copy = [...x]
        copy.push({})
        setX(copy)
    }

    function handleRemoveRow() {
        let copy = [...x]
        copy.pop()
        setX(copy)
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

  

    async function handleWinnerCorrection() {

        const planEnvoy = document.getElementById("planEnvoy").value;
        const rank = document.getElementById("rank").value;
        const abb = document.getElementById("abb").value;
        const leagueRound = document.getElementById("leagueRound").value;

        let team = []
        for (let index = 0; index < x.length; index++) {
            team.push(document.getElementById(`members${index}`).value)
        }

        const body = {
            planEnvoy, rank, abb, leagueRound, team
        }

      
        
        const file = document.getElementById(`supplementaryFile1`).files[0];

      
        const data1 = new FormData();

        data1.append('body', JSON.stringify(body))
        
        data1.append('pic', file)


        try {
            const { status } = await HttpService.put(`/api/league/context/winner/${winnerId}`, data1)
            if (status === 200) {
              
                toastSuccess("برنده با موفقیت ویرایش گردید")
                closeDialog()
                window.location.reload()
               
              
            
               

            }
        } catch (ex) {

        }

    }


    useEffect(() => {
       
        let temp = []
        for (let i in team) {
            temp.push({})
        }
        setX(temp)
    }, [])


    return (
        <DialogOverlay
            isOpen={showDialog}
            onDismiss={closeDialog}
            className="d-flex justify-content-center align-items-center"
            style={{ background: 'rgb(53 53 53 / 62%)' }}
        >
            <DialogContent style={{
                padding: '0px',
                borderRadius: '3px',
                boxShadow: '0px 10px 50px hsla(0, 0%, 0%, 0.33)',
                height: 'unset',
                maxWidth: '1200px',
                width: '50%',
                margin: 'auto',
                backgroundColor: '#f3f6fa'
            }}>

                <div className="container">

                    <div className=" d-flex justify-content-center mt-4 align-items-center flex-column">


                        <div className="userUpdateUpload d-flex align-items-center  flex-column justify-content-center">
                            <div className="mx-auto widthStyle" >
                                <div className="d-flex justify-content-center align-items-center rounded colorHeightStyle rounded-circle" >
                                    <img src={url} id='needyImg' className=' rounded-circle ' style={{ height: '140px', width: '140px' }} />
                                </div>
                            </div>
                            <div className="mt-2 px-1 d-flex justify-content-start align-items-end">
                                <label className="d-flex align-items-center justify-content-center mb-0 p-2 text-white  border rounded-3 cursor-pointer  input-file" style={{ backgroundColor: '#195FAD' }}>
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


                        <div className="userUpdateItem mb-4 mt-4">
                            <input
                                defaultValue={planEnvoy}
                                id='planEnvoy'
                                type="text"
                                placeholder="نام و نام خانوادگی نماینده طرح"
                                className="userUpdateInput"
                            />
                        </div>


                        <div className="userUpdateItem mb-5">
                            <input
                                defaultValue={rank}
                                id='rank'
                                type="text"
                                placeholder=" مقام / رتبه کسب شده "
                                className="userUpdateInput"
                            />
                        </div>


                        <div className='d-flex justify-content-between mb-4 ' style={{ width: '500px' }}>

                            <div className="selectBorder">
                                <select className="selectWinnerStyle" id="abb" defaultValue={abb}>
                                    <option className='outline-none border-0 ' value="BSM">بهسازان ملت</option>
                                    <option className='outline-none border-0 ' value="BPM">به پرداخت ملت</option>
                                    <option className='outline-none border-0 ' value='SYS'>مهندسی سیستم یاس</option>
                                    <option className='outline-none border-0 ' value='YaasSie'>مهندسی صنایع یاس ارغوانی</option>
                                    <option className='outline-none border-0 ' value='SITS'>زیرساخت امن خدمات تراکنشی</option>
                                    <option className='outline-none border-0 ' value='SHGH'>مهندسی نرم افزار شقایق</option>
                                </select>
                            </div>


                            <div className="selectBorder">
                                <select className="selectWinnerStyle" id="leagueRound" defaultValue={leagueRound}>
                                    <option className='outline-none border-0 bg-gray' selected value="0" disabled>انتخاب دوره </option>
                                    <option className='outline-none border-0 ' value="1">دوره اول</option>
                                    <option className='outline-none border-0 ' value="2">دوره دوم</option>
                                    <option className='outline-none border-0 ' value='3'>دوره سوم</option>
                                    <option className='outline-none border-0 ' value='4'>دوره چهارم</option>
                                    <option className='outline-none border-0 ' value='5'>دوره پنجم</option>
                                    <option className='outline-none border-0 ' value='6'>دوره ششم</option>
                                </select>
                            </div>

                        </div>


                        <div className='userUpdateItem  align-items-center mt-4 mb-2' style={{ width: '500px' }}>
                            <div className='d-flex justify-content-between align-items-baseline' style={{ width: '500px' }}>
                                <button className="d-flex Approved1 align-items-center mb-0 " style={{ backgroundColor: '#f3f6fa' }} onClick={handleAddRow}>
                                    <i className="fa fa-plus "></i>
                                    <p className="mb-1 Approved1 me-1">افزودن اعضای تیم</p>
                                </button>
                                <button className="d-flex redcolor align-items-center mb-0 " style={{ backgroundColor: '#f3f6fa' }} onClick={handleRemoveRow}>
                                    <i className="fa fa-minus "></i>
                                    <p className="mb-1 redcolor me-1">حذف اعضای تیم</p>
                                </button>
                            </div>
                        </div>




                        {x.map((item, index) =>
                            <>
                                <div className="userUpdateItem mb-4">
                                    <input
                                        defaultValue={team[index]}
                                        id={`members${index}`}
                                        type="text"
                                        placeholder="نام و نام خانوادگی اعضای تیم"
                                        className="userUpdateInput"
                                    />
                                </div>
                            </>
                        )}



                        <div className="userUpdateItem d-flex align-items-end" style={{ width: '500px' }}>
                            <button className="newUserButton mb-3" onClick={handleWinnerCorrection} >ویرایش</button>
                        </div>


                    </div>

                </div>


            </DialogContent>
        </DialogOverlay >);
}

export default WinnerCorrectionDialog;