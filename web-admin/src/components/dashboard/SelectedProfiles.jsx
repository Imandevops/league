import { useHistory } from "react-router";
import HttpService from "../../service/HttpService";
import { useContext, useEffect, useState } from "react";
import MainContext from "../context/MainContext";
import { toastSuccess } from "../../util/ToastUtil";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const SelectedProfiles = () => {
  const history = useHistory();
  const [selectedProfiles, setSelectedProfiles] = useState();
  const [url, setUrl] = useState();

  const [id, setId] = useState();

  async function getSelectedProfiles() {
    try {
      const { data, status } = await HttpService.get(
        "/api/league/selectedProfiles"
      );
      if (status === 200) {
        for (let obj of data) {
          const buffer = Buffer(obj.image.data);
          const blob = new Blob([buffer.buffer], { type: obj.image.type });
          const url = URL.createObjectURL(blob);
          obj.url = url;
        }
      }
      
      setSelectedProfiles(data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleCorrection = (Id) => {
    history.push(`/dashbord/SelectedProfileCorrection/${Id}`);
  };

  async function handleDelete(Id) {
    try {
      confirmAlert({
        message: "آیا از حذف رکورد اطمینان دارید?",
        buttons: [
          {
            label: "بله",
            onClick: () => deleteSelectedProfiles(),
          },
          {
            label: "خیر",
            onClick: () => history.push("/dashbord/selectedProfiles"),
          },
        ],
      });

      async function deleteSelectedProfiles() {
        try {
          const { data, status } = await HttpService.delete(
            `/api/league/selectedProfiles/${Id}`
          );

          if (status === 204) {
            toastSuccess("پروفایل برگزیده با موفقیت حذف شد");
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
    getSelectedProfiles();
  }, []);

  return (
    <div className="widgetLg1">
      <div className="userTitleContainer">
        <h3 className="widgetLgTitle">لیست پروفایل برگزیده ها</h3>
        <button
          className="userAddButton d-flex justify-content-center align-items-center"
          onClick={() => history.push("/dashbord/NewSelectedProfile")}
        >
          <i className="fa fa-plus ms-2 m-1" aria-hidden="true"></i>ایجاد
          پروفایل برگزیده
        </button>
      </div>

      <table className="widgetLgTable mt-4">
        <tr className="widgetLgTr">
          <th className="widgetLgTh ">نام شرکت</th>
          <th className="widgetLgTh "> نام و نام خانوادگی برنده </th>
          <th className="widgetLgTh ">عنوان ماهیت </th>
          <th className="widgetLgTh "> مقام کلی </th>
          <th className="widgetLgTh "> مقام مرحله ای </th>
          <th className="widgetLgTh "> </th>
        </tr>

        {selectedProfiles && selectedProfiles.length > 0 ? (
          <>
            {selectedProfiles?.map((p, index) => (
              <tr className="widgetLgTr1 pb-5">
                {/* <td className="widgetLgTd text-end " style={{ paddingRight: "25px" }}>
                  <img
                    src={p.url}
                    alt=""
                    className="widgetLgImg mb-2 ms-2"
                  />
                  <span className='mb-2'>{p.planEnvoy}</span>
                </td> */}
                <td className="widgetLgTd mb-2">{p.companyName}</td>
                <td className="widgetLgTd mb-2">{p.name + p.family}</td>
                <td className="widgetLgTd mb-2">
                  {p.natureName}
                </td>
                <td className="widgetLgTd mb-2">
                  {p.designsProvidedList[0].generalPosition}
                </td>
                <td className="widgetLgTd mb-2">{p.designsProvidedList[0].stagePosition}</td>

                <td className="widgetLgTd mb-2">
                  <button
                    className="Pending mb-2"
                    type="Pending"
                    onClick={() => handleCorrection(p.id, p.url)}
                  >
                    {" "}
                    ویرایش
                  </button>{" "}
                  |{" "}
                  <button
                    className="redcolor mb-2"
                    type="Pending"
                    onClick={() => handleDelete(p.id)}
                  >
                    {" "}
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </>
        ) : (
          <p className="text-end m-4 ">اطلاعاتی جهت نمایش وجود ندارد!</p>
        )}
      </table>
    </div>
  );
};
export default SelectedProfiles;
