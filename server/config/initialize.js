const { isUsernameExists, register, deleteUserByUsername} = require('../league/iam/atomicServices/iam');
const { mkFolder } = require("../league/plan/infra/files");



const initializeAdmin = async () => {

    // await deleteUserByUsername("eftekhari");
    // await deleteUserByUsername("fereydouni");
    // await deleteUserByUsername("shalbaf");
    // await deleteUserByUsername("E.fereydouni");
    // await deleteUserByUsername("Zargar");

    if (!await isUsernameExists("eftekhari")) {
        let Admin = { name: "علیرضا", family: "افتخاری", sex: true, age: 35, graduation: "کارشناسی ارشد", graduationField: "فناوری اطلاعات", nationalId: "2281255862", personnelId: 92555, companyName: "BSM", companyNamePer: "بهسازان فردا (پل وینو)", organizationLevel: "envoy", mobile: "09121112233", email: "eftekhari@gmail.com", type: "admin", username: "eftekhari", password: "eftekhari._.eshgh" }
        await register(Admin.name,
            Admin.family,
            Admin.sex,
            Admin.age,
            Admin.graduation,
            Admin.graduationField,
            Admin.nationalId,
            Admin.personnelId,
            Admin.companyName,
            Admin.companyNamePer,
            Admin.organizationLevel,
            Admin.mobile,
            Admin.email,
            Admin.type,
            Admin.username,
            Admin.password ,
        );
    }
    if (!await isUsernameExists("shalbaf")) {
        let ceo = { name: "محمد", family: "شالباف", sex: true, age: 55, graduation: "کارشناسی ارشد", graduationField: "فناوری اطلاعات", nationalId: "0089566412", personnelId: 95256, companyName: "BSM", companyNamePer: "بهسازان فردا (پل وینو)", organizationLevel: "ceo", mobile: "09121112244", email: "shalbaf@gmail.com", type: "admin", username: "shalbaf", password: "mh.shalbaf@polwinno" }
        await register(ceo.name,
            ceo.family,
            ceo.sex,
            ceo.age,
            ceo.graduation,
            ceo.graduationField,
            ceo.nationalId,
            ceo.personnelId,
            ceo.companyName,
            ceo.companyNamePer,
            ceo.organizationLevel,
            ceo.mobile,
            ceo.email,
            ceo.type,
            ceo.username,
            ceo.password ,
        );
    }
    if (!await isUsernameExists("efereydouni")) {
        let envoy = { name: "احسان", family: "فریدونی", sex: true, age: 35, graduation: "کارشناسی ارشد", graduationField: "فناوری اطلاعات", nationalId: "2281255896", personnelId: 40001, companyName: "BSM", companyNamePer: "بهسازان فردا (پل وینو)", organizationLevel: "envoy", mobile: "09121112255", email: "efreydoni@gmail.com", type: "admin", username: "efereydouni", password: "Eng@000516" }
        await register(envoy.name,
            envoy.family,
            envoy.sex,
            envoy.age,
            envoy.graduation,
            envoy.graduationField,
            envoy.nationalId,
            envoy.personnelId,
            envoy.companyName,
            envoy.companyNamePer,
            envoy.organizationLevel,
            envoy.mobile,
            envoy.email,
            envoy.type,
            envoy.username,
            envoy.password ,
        );
    }

    if (!await isUsernameExists("nekui")) {
        let Admin = { name: "فرناز", family: "نکویی", sex: false, age: 45, graduation: "کارشناسی ارشد", graduationField: "فناوری اطلاعات", nationalId: "2281255862", personnelId: 92555, companyName: "BSM", companyNamePer: "بهسازان فردا (پل وینو)", organizationLevel: "envoy", mobile: "09121112233", email: "nekui@gmail.com", type: "admin", username: "nekui", password: "behsazanfarda" }
        await register(Admin.name,
            Admin.family,
            Admin.sex,
            Admin.age,
            Admin.graduation,
            Admin.graduationField,
            Admin.nationalId,
            Admin.personnelId,
            Admin.companyName,
            Admin.companyNamePer,
            Admin.organizationLevel,
            Admin.mobile,
            Admin.email,
            Admin.type,
            Admin.username,
            Admin.password ,
        );
    }

  
}

const initializeFolder = async () => {
    mkFolder("../files");
    mkFolder("../profiles");
    mkFolder("../context");
    mkFolder("../context/winner");
    mkFolder("../context/about");
    mkFolder("../context/news");
    mkFolder("../context/judge");
    mkFolder("../context/gallery");
    mkFolder("../context/info");
    mkFolder("../downloads");
    mkFolder("../context/selectedProfiles");
}

module.exports = { initializeAdmin, initializeFolder }