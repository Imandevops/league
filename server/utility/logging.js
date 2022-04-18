const winston = require('winston');
require('winston-daily-rotate-file');

// var today = new Date();
// var dd = String(today.getDate()).padStart(2, '0');
// var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
// var yyyy = today.getFullYear();

let consoleLogFormat = winston.format.combine(
    winston.format.colorize({
        all: true
    }),
    winston.format.label({
        label: '[server]'
    }),
    winston.format.timestamp({
        format: "YY-MM-DD hh:mm:ss"
    }),
    winston.format.printf(
        info => ` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`
    )
);

let fileLogFormat = winston.format.combine(
    winston.format.label({
        label: '[Server]'
    }),
    winston.format.timestamp({
        format: "YY-MM-DD hh:mm:ss"
    }),
    winston.format.printf(
        info => ` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`
    )
);

winston.addColors({
    info: 'bold blue',
    warn: 'italic yellow',
    error: 'bold red',
});
const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        //filename: `../../log/${yyyy}-${mm}-${dd}-DEBUG.log`, level: 'debug', format: winston.format.combine(fileLogFormat) 
        new (winston.transports.DailyRotateFile)({filename: '../../log/%DATE%-DEBUG.log', level: 'debug', datePattern: 'YYYY-MM-DD', format: winston.format.combine(fileLogFormat)}),
        new (winston.transports.DailyRotateFile)({ filename: '../../log/%DATE%-ERROR.log', level: 'error', datePattern: 'YYYY-MM-DD', format: winston.format.combine(fileLogFormat) }),
        new (winston.transports.Console)({
            format: winston.format.combine(winston.format.colorize(), consoleLogFormat)   
        })]
});


logger.on('close', (info)=>{
        logger.error(info.toString())
})



module.exports = { logger }




