  const statuses = {
    toCeo: {
      code:1, message:`در انتظار تایید مدیر شرکت`
    },
    ceoAccept: {
      code:2, message:`تایید شده توسط مدیر شرکت`
    },
    ceoReject: {
      code:3, message:`رد شده توسط مدیر شرکت`
    },
    sysAccept: {
      code:4, message:`تایید شده توسط سیستم`
    },
    adminIncomplete: {
      code:5, message:`رد شده توسط ادمین(ناقص)`
    },
    adminReject: {
      code:6, message:`رد شده توسط ادمین`
    },
    adminAccept: {
      code:7, message:`تایید شده توسط ادمین`
    },
    toExpert: {
      code:8, message:`ارسال به کارشناسی`
    },
    onExpert: {
      code:9, message:`در حال کارشناسی`
    },
    expertAccept: {
      code:10, message:`پذیرش توسط کارشناس`
    },
    expertReject: {
      code:11, message:`رد توسط کارشناس`
    },
    toJudge: {
      code:12, message:`ارسال به داوری`
    },
    onJudge: {
      code:13, message:`در حال داوری`
    },
    judgeAccept: {
      code:14, message:`پذیرش توسط داور`
    },
    judgeReject: {
      code:15, message:`رد توسط داور`
    },
    standFirst: {
      code:16, message:`جایگاه اول`
    },
    standSecond: {
      code:17, message:`جایگاه دوم`
    },
    standThirds: {
      code:18, message:`جایگاه سوم`
    },
    first: {
      code:19, message:`رتبه اول`
    },
    second: {
      code:20, message:`رتبه دوم`
    },
    third: {
      code:21, message:`رتبه سوم`
    },
  }

  module.exports =  {statuses};
