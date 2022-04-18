import React, { useEffect, useState, Fragment } from "react";
import { toastError } from "../../util/ToastUtil";
import HttpService from "../../service/HttpService";

import { useHistory } from "react-router-dom";

import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const PlanView = ({ planId }) => {
  const [plan, setPlan] = useState([]);
  const [array, setArray] = useState([]);

  const history = useHistory();
  const multiDataSet = [];

  async function getPlan() {
    try {
      const { data, status } = await HttpService.get(
        `/api/league/plan/${planId}`
      );

      if (status === 200) {
        multiDataSet.push({
          columns: [
            "دوره لیگ",
            "مرحله لیگ",
            "عنوان طرح",
            "نام شرکت",
            "زمینه تخصصی شرکت",
            "نماینده شرکت",
            "حوزه",
            "سطح",
            "ماهیت",
          ],
          data: [
            [
              data.leagueCourse,
              data.leagueStage,
              data.planName,
              data.companyNamePer,
              data.specializedField,
              data.companyEnvoy,
              data.fieldName,
              data.levelName,
              data.planNatureName,
            ],
          ],
        });

        for (let i = 0; i < data.authors.length; i++) {
          if (i == 0) {
            multiDataSet.push({
              xSteps: 1, // Will start putting cell with 1 empty cell on left most
              ySteps: 5, //will put space of 5 rows,
              columns: [
                "نام و نام خانوادگی صاحب اثر",
                "آخریم مدرک تحصیلی",
                "نوع همکاری با سازمان",
                "سابقه حضور در سازمان",
                "واحد محل خدمت",
                "سمت حوزه تخصصی",
                "شماره تماس",
                "پست الکترونیکی",
              ],
              data: [
                [
                  data.authors[i].name,
                  data.authors[i].lastCertificate,
                  data.authors[i].cooperationType,
                  data.authors[i].attendanceHistory,
                  data.authors[i].servicePlaceUnit,
                  data.authors[i].specializedLevel,
                  data.authors[i].phone,
                  data.authors[i].email,
                ],
              ],
            });
          } else {
            multiDataSet.push({
              xSteps: 1, // Will start putting cell with 1 empty cell on left most
              columns: ["", ""],
              data: [
                [
                  data.authors[i].name,
                  data.authors[i].lastCertificate,
                  data.authors[i].cooperationType,
                  data.authors[i].attendanceHistory,
                  data.authors[i].servicePlaceUnit,
                  data.authors[i].specializedLevel,
                  data.authors[i].phone,
                  data.authors[i].email,
                ],
              ],
            });
          }
        }

        setPlan(data);

        setArray(multiDataSet);
      }
    } catch (error) {}
  }

  useEffect(() => {
    getPlan();
  }, []);

  return (
    <div className="container">
      {/* <h5 className='text-center mt-5 mb-3'> اطلاعات هویتی و سازمانی</h5> */}

      <div
        className="d-flex flex-column  border border-radius-25px"
        id="test-table-xls-button"
      >
        <div className="d-flex justify-content-between mx-1 mt-3 row">
          <div className="col-12 col-sm-4 mt-2 mt-sm-0 px-1 d-flex justify-content-between ">
            <div className="col-12 col-md-4 col-lg-7">
              <label className="pcenter  w-100 border p-2" style={{backgroundColor : "lightcyan"}}> 
                {" "}
                دوره لیگ{" "}
              </label>

              <input
                className="pcenter  w-100 border p-2"
                placeholder="دوره لیگ"
                type="text"
                id="leagueCourse"
                defaultValue={plan?.leagueCourse}
                readOnly
              />
            </div>
            <div className="col-12 col-md-4 col-lg-7">
              <label className="pcenter w-100 border mx-1  p-2 " style={{backgroundColor : "lightcyan"}}>
                {" "}
                مرحله لیگ{" "}
              </label>
              <input
                className="pcenter w-100 border p-2 mx-1"
                placeholder="مرحله لیگ"
                type="text"
                id="leagueStage"
                defaultValue={plan?.leagueStage}
                readOnly
              />
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between mx-1 mt-3 row">
          <div className="col-12 col-sm-4 mt-2 mt-sm-0 px-1 d-flex justify-content-between ">
            <div className="col-12 col-md-4 col-lg-7">
              <label className="pcenter w-100 border p-2" style={{backgroundColor : "lightcyan"}}>
                {" "}
                نام طرح{" "}
              </label>
              <input
                className="pcenter  w-100 border p-2"
                type="text"
                id="planName"
                defaultValue={plan?.planName}
                readOnly
              />
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between mx-1 mt-3 row">
          <div className="col-12 col-sm-4 mt-2 mt-sm-0 px-1 d-flex justify-content-between ">
            <div className="col-12 col-md-4 col-lg-7">
              <label className="pcenter w-100 border p-2" style={{backgroundColor : "lightcyan"}}>
                {" "}
                نام شرکت{" "}
              </label>
              <input
                className="pcenter  w-100 border p-2"
                placeholder="نام شرکت"
                type="text"
                id="companyNamePer"
                defaultValue={plan?.companyNamePer}
                readOnly
              />
            </div>
            <div className="col-12 col-md-4 col-lg-7">
              <label className="pcenter w-100 mx-1 border p-2" style={{backgroundColor : "lightcyan"}}>
                {" "}
                زمینه تخصصی طرح{" "}
              </label>
              <input
                className="pcenter  w-100 border p-2 mx-1"
                placeholder="زمینه تخصصی طرح"
                type="text"
                id="specializedField"
                defaultValue={plan?.specializedField}
                readOnly
              />
            </div>
            <div className="col-12 col-md-4 col-lg-7">
              <label className="pcenter w-100 mx-2 border p-2" style={{backgroundColor : "lightcyan"}}>
                {" "}
                نام و نام خانوادگی نماینده شرکت{" "}
              </label>
              <input
                className="pcenter  w-100 border p-2 mx-2"
                placeholder="نام و نام خانوادگی نماینده شرکت"
                type="text"
                id="companyEnvoy"
                defaultValue={plan?.companyEnvoy}
                readOnly
              />
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between mx-1 mt-3 row">
          <div className="col-12 col-sm-4 mt-2 mt-sm-0 px-1 d-flex justify-content-between ">
            <div className="col-12 col-md-4 col-lg-7">
              <label className="pcenter  w-100 border p-2" style={{backgroundColor : "lightcyan"}}>
                {" "}
                حوزه{" "}
              </label>
              <input
                className="pcenter  w-100 border p-2"
                type="text"
                id="fieldName"
                defaultValue={plan?.fieldName}
                readOnly
              />
            </div>
            <div className="col-12 col-md-4 col-lg-7">
              <label className="pcenter w-100 mx-1 border p-2" style={{backgroundColor : "lightcyan"}}>
                سطح{" "}
              </label>
              <input
                className="pcenter  w-100 border p-2 mx-1"
                type="text"
                id="levelName"
                defaultValue={plan?.levelName}
                readOnly
              />
            </div>
            <div className="col-12 col-md-4 col-lg-7">
              <label className="pcenter  w-100 mx-2 border p-2" style={{backgroundColor : "lightcyan"}}>
                ماهیت{" "}
              </label>
              <input
                className="pcenter  w-100 border p-2 mx-2"
                type="text"
                id="planNatureName"
                defaultValue={plan?.planNatureName}
                readOnly
              />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between mx-1 mt-3 row">
          <div className="col-12 col-sm-4 mt-2 mt-sm-0 px-1 d-flex justify-content-between">
            <div className="col-12 col-md-4 col-lg-5">
              <label className="pcenter  w-100 border p-2" style={{backgroundColor : "lightcyan"}}>
                صاحب اثر{" "}
              </label>
            </div>
            <div className="col-12 col-md-4 col-lg-5">
              <label className="pcenter w-100 border p-2" style={{backgroundColor : "lightcyan"}}>
                آخرین مدرک تحصیلی{" "}
              </label>
            </div>
            <div className="col-12 col-md-4 col-lg-4">
              <label className="pcenter w-100 border p-2" style={{backgroundColor : "lightcyan"}}>
                نوع همکاری{" "}
              </label>
            </div>

            <div className="col-12 col-md-4 col-lg-5">
              <label className="pcenter w-100 border p-2" style={{backgroundColor : "lightcyan"}}>
                سابقه حضور{" "}
              </label>
            </div>

            <div className="col-12 col-md-4 col-lg-4">
              <label className="pcenter w-100 border p-2" style={{backgroundColor : "lightcyan"}}>
                واحد محل خدمت{" "}
              </label>
            </div>

            <div className="col-12 col-md-4 col-lg-4">
              <label className="pcenter w-100 border p-2" style={{backgroundColor : "lightcyan"}}>
                سمت{" "}
              </label>
            </div>

            <div className="col-12 col-md-4 col-lg-4">
              <label className="pcenter w-100 border p-2" style={{backgroundColor : "lightcyan"}}>
                شماره تماس{" "}
              </label>
            </div>

            <div className="col-12 col-md-4 col-lg-5">
              <label className="pcenter w-100 border p-2" style={{backgroundColor : "lightcyan"}}>
                پست الکترونیکی{" "}
              </label>
            </div>
          </div>
        </div>
        {plan?.authors?.map((b, index) => (
          <div className="d-flex justify-content-between mx-1 mt-3 row">
            <div className="col-12 col-sm-4 mt-2 mt-sm-0 px-1 d-flex justify-content-between">
              <div className="col-12 col-md-4 col-lg-5">
                <input
                  className="pcenter w-100 border p-2"
                  type="text"
                  size={26}
                  defaultValue={b.name}
                  id={"name"}
                  readOnly
                />
              </div>
              <div className="col-12 col-md-4 col-lg-5">
                <input
                  className="pcenter w-100 border p-2"
                  type="text"
                  id={"lastCertificate"}
                  defaultValue={b.lastCertificate}
                  readOnly
                />
              </div>
              <div className="col-12 col-md-4 col-lg-4">
                <input
                  className="pcenter w-100 border p-2"
                  type="text"
                  id={"cooperationType"}
                  defaultValue={b.cooperationType}
                  readOnly
                />
              </div>

              <div className="col-12 col-md-4 col-lg-5">
                <input
                  className="pcenter w-100 border p-2"
                  type="text"
                  id={"attendanceHistory"}
                  defaultValue={b.attendanceHistory}
                  readOnly
                />
              </div>

              <div className="col-12 col-md-4 col-lg-4">
                <input
                  className="pcenter w-100 border p-2"
                  type="text"
                  id={"servicePlaceUnit"}
                  defaultValue={b.servicePlaceUnit}
                  readOnly
                />
              </div>

              <div className="col-12 col-md-4 col-lg-4">
                <input
                  className="pcenter w-100 border p-2"
                  type="text"
                  id={"specializedLevel"}
                  defaultValue={b.specializedLevel}
                  readOnly
                />
              </div>

              <div className="col-12 col-md-4 col-lg-4">
                <input
                  className="pcenter w-100 border p-2"
                  type="text"
                  id={"phone"}
                  defaultValue={b.phone}
                  readOnly
                />
              </div>

              <div className="col-12 col-md-4 col-lg-5">
                <input
                  className="pcenter w-100 border p-2"
                  type="text"
                  id={"email"}
                  defaultValue={b.email}
                  readOnly
                />
              </div>
            </div>
          </div>
        ))}

        <br />

        {/* <ExcelFile element={<button className='formbutton  flex-grow-1 mx-2 outline-0'>دانلود در قالب اکسل</button>}>
          <ExcelSheet data={[plan]} name="Sheet1">
            
            <ExcelColumn label="planName" value="planName" />
            <ExcelColumn label="companyNamePer" value="companyNamePer" />
            <ExcelColumn label="specializedField" value="specializedField" />
            <ExcelColumn label="companyEnvoy" value="companyEnvoy" />
            <ExcelColumn label="fieldName" value="fieldName" />
            <ExcelColumn label="levelName" value="levelName" />
            <ExcelColumn label="planNatureName" value="planNatureName" />
       
          </ExcelSheet>

          <ExcelSheet data={[plan][0].authors} name="Sheet2">
            
            <ExcelColumn label="name" value="name" />
            <ExcelColumn label="lastCertificate" value="lastCertificate" />
            <ExcelColumn label="cooperationType" value="cooperationType" />
            <ExcelColumn label="attendanceHistory" value="attendanceHistory" />
            <ExcelColumn label="servicePlaceUnit" value="servicePlaceUnit" />
            <ExcelColumn label="specializedLevel" value="specializedLevel" />
            <ExcelColumn label="phone" value="phone" />
            <ExcelColumn label="email" value="email" />
          </ExcelSheet>
        </ExcelFile> */}

        <ExcelFile
          element={
            <button className="btn-blue flex-grow-1 mx-2 outline-0">
              دانلود در قالب اکسل
            </button>
          }
        >
          <ExcelSheet dataSet={array} name="Organization" />
        </ExcelFile>
        <br />
      </div>
    </div>
  );
};

export default PlanView;
