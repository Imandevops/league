
import { useHistory } from "react-router";
import HttpService from "../../service/HttpService";
import { useContext, useEffect, useState } from "react";
import WinnerShowDialog from "../dialogs/WinnerShowDialog";
import WinnerCorrectionDialog from "../dialogs/WinnerCorrectionDialog";
import MainContext from '../context/MainContext';
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { toastSuccess } from "../../util/ToastUtil";


const Winners = () => {

  const { setLoadingDialog } = useContext(MainContext)
  const history = useHistory()
  const [winners, setWinners] = useState()
  const [winnerShowDialog, setWinnerShowDialog] = useState(false)
  const [winnerCorrectionDialog, setWinnerCorrectionDialog] = useState(false)
  const [url, setUrl] = useState()
  const [planEnvoy, setPlanEnvoy] = useState()
  const [rank, setRank] = useState()
  const [companyName, setCompanyName] = useState()
  const [team, setTeam] = useState()
  const [leagueRound, setLeagueRound] = useState()
  const [abb, setAbb] = useState()
  const [id, setId] = useState()


  async function getWinners() {
    setLoadingDialog(true)
    try {
      const { data, status } = await HttpService.get('/api/league/context/winner')
      if (status === 200) {
        for (let obj of data) {
          const buffer = Buffer(obj.image.data);
          const blob = new Blob([buffer.buffer], { type: obj.image.type });
          const url = URL.createObjectURL(blob);
          obj.url = url
        }
      }
      setWinners(data)
    } catch (error) {
      console.log(error);
    }
    setLoadingDialog(false)
  }


  function handleShow(url, planEnvoy, rank, companyName, team) {
    setWinnerShowDialog(true)
    setUrl(url)
    setPlanEnvoy(planEnvoy)
    setRank(rank)
    setCompanyName(companyName)
    setTeam(team)
  }

  function handleCorrection(url, planEnvoy, rank, companyName, team, leagueRound, id,abb) {
    setWinnerCorrectionDialog(true)
    setUrl(url)
    setPlanEnvoy(planEnvoy)
    setRank(rank)
    setCompanyName(companyName)
    setTeam(team)
    setLeagueRound(leagueRound)
    setAbb(abb)
    setId(id)
  }

  async function handleDelete(Id) {
    try {
      confirmAlert({
        message: "آیا از حذف رکورد اطمینان دارید?",
        buttons: [
          {
            label: "بله",
            onClick: () => deleteWinner(),
          },
          {
            label: "خیر",
            onClick: () => history.push("/dashbord/Winners"),
          },
        ],
      });

      async function deleteWinner() {
        try {
          const { data, status } = await HttpService.delete(
            `/api/league/context/winner/${Id}`
          );
          
          if (status === 204) {
            toastSuccess("برنده با موفقیت حذف شد");
            window.location.reload();
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  
  useEffect(() => {
    getWinners()
  }, [])


  return (
    <div className="widgetLg1">

      {winnerShowDialog ?
        <WinnerShowDialog
          url={url}
          planEnvoy={planEnvoy}
          rank={rank}
          companyName={companyName}          
          team={team}
          showDialog={winnerShowDialog}
          closeDialog={() => setWinnerShowDialog(false)}
        /> : null}



      {winnerCorrectionDialog ?
        <WinnerCorrectionDialog
          url={url}
          planEnvoy={planEnvoy}
          rank={rank}
          companyName={companyName}
          team={team}
          leagueRound={leagueRound}
          abb = {abb}
          winnerId={id}
          showDialog={winnerCorrectionDialog}
          closeDialog={() => setWinnerCorrectionDialog(false)}
        /> : null}



      <div className="userTitleContainer">
        <h3 className="widgetLgTitle">لیست برندگان</h3>
        <button className="userAddButton d-flex justify-content-center align-items-center" onClick={() => history.push('/dashbord/newWinner')}><i className="fa fa-plus ms-2 m-1" aria-hidden="true"></i>ایجاد برنده</button>
      </div>



      <table className="widgetLgTable mt-4">
        <tr className="widgetLgTr">
          <th className="widgetLgTh text-end"> نام و نام خانوادگی </th>
          <th className="widgetLgTh "> مقام </th>
          <th className="widgetLgTh ">شرکت </th>
          <th className="widgetLgTh ">تغییر </th>
        </tr>

        {winners && winners.length > 0 ?
          <>

            {winners?.map((p, index) => (
              <tr className="widgetLgTr1 pb-5">
                <td className="widgetLgTd text-end " style={{ paddingRight: "25px" }}>
                  <img
                    src={p.url}
                    alt=""
                    className="widgetLgImg mb-2 ms-2"
                  />
                  <span className='mb-2'>{p.planEnvoy}</span>
                </td>
                <td className="widgetLgTd mb-2"> رتبه {p.rank}</td>
                <td className="widgetLgTd mb-2">{p.companyName}</td>
                <td className="widgetLgTd mb-2">
                  <button className='Approved mb-2' type="Approved" onClick={() => handleShow(p.url, p.planEnvoy, p.rank, p.companyName, p.team)}  > نمایش</button> | <button className='Pending mb-2' type="Pending" onClick={() => handleCorrection(p.url, p.planEnvoy, p.rank, p.companyName, p.team, p.leagueRound, p.id,p.abb)} > ویرایش</button>
                  | <button className="redcolor mb-2" type="Pending" onClick={() => handleDelete(p.id)}> حذف </button>
                </td>
              </tr>
            ))}
          </>
          :
          <p className='text-end m-4 '>اطلاعاتی جهت نمایش وجود ندارد!</p>}
      </table>




    </div>
  );
}
export default Winners;
