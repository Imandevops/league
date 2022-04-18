import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import HttpService from "../../service/HttpService";
import GalleryCorrectionDialog from "../dialogs/GalleryCorrectionDialog";
import GalleryShowDialog from "../dialogs/GalleryShowDialog";
import MainContext from '../context/MainContext';
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { toastSuccess } from "../../util/ToastUtil";



const Gallery = () => {

    const { setLoadingDialog } = useContext(MainContext)
    const history = useHistory()
    const [galleryArchive, setGalleryArchive] = useState()

    const [galleryCorrectionDialog, setGalleryCorrectionDialog] = useState(false)
    const [galleryShowDialog, setGalleryShowDialog] = useState(false)

    const [url, setUrl] = useState()
    const [context, setContext] = useState()
    const [infoId, setInfoId] = useState()
    const [round, setRound] = useState()
    const [leagueRound, setLeagueRound] = useState()



    function handleInfoCorrection(url, context, id, round) {
        setGalleryCorrectionDialog(true)
        setUrl(url)
        setContext(context)
        setInfoId(id)
        setLeagueRound(round)
    }


    function handleShowInfo(url, context, round) {
        setGalleryShowDialog(true)
        setUrl(url)
        setRound(round)
        setContext(context)
    }

    async function getGallery() {
        setLoadingDialog(true)
        try {
            const { data, status } = await HttpService.get('/api/league/context/gallery')
            if (status === 200) {
                for (let obj of data) {
                    const buffer = Buffer(obj.image.data);
                    const blob = new Blob([buffer.buffer], { type: obj.image.type });
                    const url = URL.createObjectURL(blob);
                    obj.url = url
                }
                setGalleryArchive(data)
            }

        } catch (error) {
            console.log(error);
        }
        setLoadingDialog(false)
    }

    async function handleDelete(Id) {
        try {
          confirmAlert({
            message: "آیا از حذف رکورد اطمینان دارید?",
            buttons: [
              {
                label: "بله",
                onClick: () => deleteGallery(),
              },
              {
                label: "خیر",
                onClick: () => history.push("/dashbord/Gallery"),
              },
            ],
          });
    
          async function deleteGallery() {
            try {
              const { data, status } = await HttpService.delete(
                `/api/league/context/gallery/${Id}`
              );
              
              if (status === 204) {
                toastSuccess("تصویر با موفقیت حذف شد");
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
        getGallery()
    }, [])




    return (
        <div className="widgetLg1">

            {galleryCorrectionDialog ?
                <GalleryCorrectionDialog
                    getGallery={getGallery}
                    id={infoId}
                    url={url}
                    description={context}
                    leagueRound={leagueRound}
                    showDialog={galleryCorrectionDialog}
                    closeDialog={() => setGalleryCorrectionDialog(false)}
                /> : null}


            {galleryShowDialog ?
                <GalleryShowDialog
                    url={url}
                    description={context}
                    round={round}
                    showDialog={galleryShowDialog}
                    closeDialog={() => setGalleryShowDialog(false)}
                /> : null}


            <div className="userTitleContainer">
                <h3 className="widgetLgTitle"> آرشیو گالری تصاویر</h3>
                <button className="userAddButton d-flex align-items-center justify-content-center" onClick={() => history.push('/dashbord/newGallery')}> <i className="fa fa-plus ms-2 mt-1" aria-hidden="true"></i> تصویــر  </button>
            </div>

            <div className=''>
                <table className="widgetLgTable mt-4">
                    <tr className=" widgetLgTrborder1" >
                        <th className=" widgetLgTh  text-center" > دوره لیگ </th>
                        <th className=" widgetLgTh  text-center" > تصویر </th>
                        <th className=" widgetLgTh p-4 text-center"> محتوا   </th>
                        <th className="widgetLgTh ">تغییـــر </th>
                    </tr>

                    {galleryArchive && galleryArchive.length > 0 ?
                        <>
                            {galleryArchive?.map((p) => (
                                <tr className="widgetLgTrborder pb-5">
                                    <td className="widgetLgTd text-center p-4 mb-2" > لیگ {p.round}</td>
                                    <td className="widgetLgTd text-end " >
                                        <img
                                            src={p.url}
                                            alt=""
                                            className="widgetLgImg2 w-100"
                                        />

                                    </td>
                                    <td className="widgetLgTd text-end p-4 mb-2" style={{ maxWidth: '940px', width: '340px' }}> {p.context.substring(0, 180)} ...</td>
                                    <td className="widgetLgTd mb-2">
                                        <button className='Approved mb-2' type="Approved" onClick={() => handleShowInfo(p.url, p.context, p.round)}  > نمایش</button> |  <button className='Pending mb-2' type="Pending" onClick={() => handleInfoCorrection(p.url, p.context, p.id, p.round)} > ویرایش</button>
                                        | <button className="redcolor mb-2" type="Pending" onClick={() => handleDelete(p.id)}> حذف </button>
                                    </td>
                                </tr>
                            ))}
                        </>
                        : <p className='text-end  m-3 ' >اطلاعاتی جهت نمایش وجود ندارد!</p>}
                </table>
            </div>

        </div>

    );
}

export default Gallery;