const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const {v4: uuid} = require('uuid');

const logEvents = async (message, logName) => {
    let date = new Date();
    let logItem = `${date.toLocaleString() }\t${uuid()}\t ${message}\n`;
    try{
        if( !fs.existsSync(path.join(__dirname, '..', 'logs')) ){
            fsPromises.mkdir(path.join(__dirname, '..','logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName) , logItem)
    }catch (err){
        console.log(err);
    }
};
const logger = (req, res, next)=>{
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    console.log(`${req.method} ${req.path}`);
    next();
};

module.exports = {logger, logEvents};