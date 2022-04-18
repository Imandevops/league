import React, { useContext, useEffect, useState } from "react";
import step1 from "../../static/images/step1.png";
import { useHistory } from "react-router";
import MainContext from "../context/MainContext";
import { toastError } from "../../util/ToastUtil";
import HttpService from "../../service/HttpService";
import { validate } from "react-email-validator";

const Step1 = ({ planId, callbackState }) => {
  const [x, setX] = useState([
    {
      placeholder1: "نام و نام خانوادگی صاحب اثر",

      placeholder2: "آخرین مدرک تحصیلی",
      placeholder3: "نوع همکاری با سازمان",
      placeholder4: "سابقه حضور در سازمان",
      placeholder5: "واحد محل خدمت",
      placeholder6: "سمت (حوزه تخصصی)",

      placeholder7: "شماره تماس",
      placeholder8: "پست الکترونیکی",
    },
  ]);

  const { createPlan, setCreatePlan, setLoadingDialog, setFiles } =
    useContext(MainContext);
  const history = useHistory();

  const handleLoadPlan = async () => {
    setLoadingDialog(true);
    try {
      let { data, status } = await HttpService.get(
        `/api/league/plan/${planId}`
      );

      if (status === 200) {
        delete data.fieldName;
        delete data.levelName;
        delete data.planNatureName;
        delete data.companyNamePer;
        delete data.planId;
        delete data.planIndex;
        delete data.issuedDate;

        localStorage.setItem("planUniqueName", data.planUniqueName);
        delete data.planUniqueName;
        setFiles(data.files);
        delete data.files;
        setCreatePlan(data);
        setX(data?.authors);
      }
    } catch (error) {}
    setLoadingDialog(false);
  };

  function handleAddRow() {
    let copy = [...x];
    copy.push({
      placeholder1: "نام و نام خانوادگی صاحب اثر",

      placeholder2: "آخرین مدرک تحصیلی",
      placeholder3: "نوع همکاری با سازمان",
      placeholder4: "سابقه حضور در سازمان",
      placeholder5: "واحد محل خدمت",
      placeholder6: "سمت (حوزه تخصصی)",

      placeholder7: "شماره تماس",
      placeholder8: "پست الکترونیکی",
    });
    setX(copy);
  }

  function handleRemoveRow() {
    let copy = [...x];
    copy.pop();
    setX(copy);
  }

  function handleGoToStep2() {
    const specializedField = document.getElementById("specializedField").value;
    const leagueCourse = document.getElementById("leagueCourse").value;
    const leagueStage = document.getElementById("leagueStage").value;

    let copy = { ...createPlan };
    copy.abb = localStorage.getItem("abb");
    copy.companyEnvoy = localStorage.getItem("name");
    copy.specializedField = specializedField;
    copy.leagueCourse = leagueCourse;
    copy.leagueStage = leagueStage;

    let authors = [];

    x.forEach((b, index) =>
      authors.push({
        name: document.getElementById(`name${index}`).value,
        phone: document.getElementById(`phone${index}`).value,
        email: document.getElementById(`email${index}`).value,

        lastCertificate: document.getElementById(`lastCertificate${index}`)
          .value,
        cooperationType: document.getElementById(`cooperationType${index}`)
          .value,
        attendanceHistory: document.getElementById(`attendanceHistory${index}`)
          .value,
        servicePlaceUnit: document.getElementById(`servicePlaceUnit${index}`)
          .value,
        specializedLevel: document.getElementById(`specializedLevel${index}`)
          .value,
      })
    );

    copy.authors = authors;

    if (specializedField.length === 0) {
      toastError("زمینه تخصصی طرح مشخص شود!");
      return;
    }

    if (leagueCourse.length === 0) {
      toastError("دوره لیگ مشخص شود!");
      return;
    }

    if (leagueStage.length === 0) {
      toastError("مرحله لیگ مشخص شود!");
      return;
    }

    if (authors.length === 0) {
      toastError("اطلاعات مربوط به نویسندگان طرح تکمیل شود!");
      return;
    }

    for (let index = 0; index < authors.length; index++) {
      const element = authors[index];
      if (
        !element.name ||
        !element.phone ||
        !element.email ||
        !element.lastCertificate ||
        !element.cooperationType ||
        !element.attendanceHistory ||
        !element.servicePlaceUnit ||
        !element.specializedLevel
      ) {
        toastError("اطلاعات مربوط به نویسندگان طرح تکمیل شود!");
        return;
      }
      if (
        !(
          element.phone.length === 11 &&
          parseInt(element.phone) > 9000000000 &&
          parseInt(element.phone) < 9999999999
        )
      ) {
        toastError("شماره موبایل صاحب اثر صحیح وارد نشده است!");
        return;
      }

      if (!validate(element.email)) {
        toastError("ایمیل نویسنده طرح اشتباه است!");
        return;
      }
    }

    setCreatePlan(copy);

    planId
      ? history.push(`/panelRouter/createPlan/step2/${planId}`)
      : history.push("/panelRouter/createPlan/step2");
  }

  useEffect(() => {
    if (createPlan?.authors && createPlan?.authors.length > 0) {
      setX(createPlan?.authors);
    }
    if (planId && callbackState !== "callbackState") {
      handleLoadPlan();
    }
  }, []);

  return (
    <div className="container">
      <h5 className="text-center mt-5 mb-3">ثبت اطلاعات هویتی و سازمانی</h5>

      <img className="my-5" src={step1} alt="" />

      <div className="d-flex align-items-center mb-1 alert alert-info border-radius-25px">
        <i
          className="fa fa-exclamation-circle text-danger fs-5"
          aria-hidden="true"
        ></i>
        <span className="text-center mb-0 me-1 text-center">
          لطفا در تمامی مراحل ثبت و ویـــرایش از رفرش کردن صفحه خودداری کنید!
        </span>
      </div>

      <div className="d-flex flex-column  border border-radius-25px">
        <div
          className="d-flex align-items-center admin-btn bg-persian-red text-white align-self-start mx-5 py-0 mt-4 border-0 rounded mb-2"
          id="addAuthor"
        >
          <i
            className="fa fa-plus p-1 rounded-end cursor-p"
            id="addRow"
            onClick={handleAddRow}
          ></i>
          <p className="mb-0 border-end border-start px-1"> صاحب اثر</p>
          <i
            className="fa fa-minus bg-persian-red p-1 rounded-start cursor-p"
            id="removeRow"
            onClick={handleRemoveRow}
          ></i>
        </div>

        <div className="d-flex justify-content-between mx-1 mt-3 row">
          <div className="col-12 col-sm-4 mt-2 mt-sm-0 px-1 d-flex justify-content-between ">
            <div className="col-12 col-md-4 col-lg-7">
              <input
                className=" alert-info w-100 border p-2"
                placeholder="نام شرکت"
                type="text"
                id="companyName"
                value={`شرکت ${localStorage.getItem("companyNamePer")}`}
                readOnly
              />
            </div>
            <div className="col-12 col-md-4 col-lg-5">
              <input
                className="alert-info w-100 border p-2"
                placeholder="زمینه تخصصی طرح"
                type="text"
                id="specializedField"
                defaultValue={createPlan.specializedField}
              />
            </div>
            <div className="col-12 col-md-4 col-lg-7">
              <input
                className="alert-info w-100 border p-2"
                placeholder="نام و نام خانوادگی نماینده شرکت"
                type="text"
                id="copmanyAgentName"
                value={`نماینده شرکت ${localStorage.getItem("name")}`}
                readOnly
              />
            </div>
            <div className="col-12 col-md-4 col-lg-5">
              <input
                className="alert-info w-100 border p-2"
                placeholder="دوره لیگ"
                type="text"
                id="leagueCourse"
                defaultValue={createPlan.leagueCourse}
              />
            </div>
            <div className="col-12 col-md-4 col-lg-5">
              <input
                className="alert-info w-100 border p-2"
                placeholder="مرحله لیگ"
                type="text"
                id="leagueStage"
                defaultValue={createPlan.leagueStage}
              />
            </div>
          </div>
        </div>

        {x.map((b, index) => (
          <div
            className="d-flex justify-content-between mx-1 mt-3 row"
            key={index}
          >
            <div className="col-12 col-sm-4 mt-2 mt-sm-0 px-1 d-flex justify-content-between">
              <div className="col-12 col-md-4 col-lg-5">
                <input
                  className="w-100 border p-2"
                  placeholder={b.placeholder1}
                  type="text"
                  size={26}
                  id={`name${index}`}
                  defaultValue={b.name}
                />
              </div>
              <div className="col-12 col-md-4 col-lg-5">
                <input
                  className="w-100 border p-2"
                  placeholder={b.placeholder2}
                  type="text"
                  id={`lastCertificate${index}`}
                  defaultValue={b.lastCertificate}
                />
              </div>
              <div className="col-12 col-md-4 col-lg-5">
                <input
                  className="w-100 border p-2"
                  placeholder={b.placeholder3}
                  type="text"
                  id={`cooperationType${index}`}
                  defaultValue={b.cooperationType}
                />
              </div>

              <div className="col-12 col-md-4 col-lg-5">
                <input
                  className="w-100 border p-2"
                  placeholder={b.placeholder4}
                  type="text"
                  id={`attendanceHistory${index}`}
                  defaultValue={b.attendanceHistory}
                />
              </div>

              <div className="col-12 col-md-4 col-lg-4">
                <input
                  className="w-100 border p-2"
                  placeholder={b.placeholder5}
                  type="text"
                  id={`servicePlaceUnit${index}`}
                  defaultValue={b.servicePlaceUnit}
                />
              </div>

              <div className="col-12 col-md-4 col-lg-4">
                <input
                  className="w-100 border p-2"
                  placeholder={b.placeholder6}
                  type="text"
                  id={`specializedLevel${index}`}
                  defaultValue={b.specializedLevel}
                />
              </div>

              <div className="col-12 col-md-4 col-lg-3">
                <input
                  className="w-100 border p-2"
                  placeholder={b.placeholder7}
                  type="text"
                  id={`phone${index}`}
                  defaultValue={b.phone}
                />
              </div>

              <div className="col-12 col-md-4 col-lg-5">
                <input
                  className="w-100 border p-2"
                  placeholder={b.placeholder8}
                  type="text"
                  id={`email${index}`}
                  defaultValue={b.email}
                />
              </div>
            </div>
          </div>
        ))}

        <button
          className="d-flex align-items-center border-0 rounded bg-persian-blue text-white align-self-end mt-2 mx-5 px-2 mb-4"
          onClick={handleGoToStep2}
        >
          <p className="mb-0 me-1  ps-1  border-start">مرحله بعد</p>
          <i className="fa fa-hand-o-left pe-1"></i>
        </button>
      </div>
    </div>
  );
};

export default Step1;
