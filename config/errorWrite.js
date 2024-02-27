const fs = require('fs');
const BREAKER = '\n----------------------------------------------------------------------\n';
const today = new Date();
const time = 'Time: ' + today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() +'  '+ today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

module.exports.logWriter = (command, errorTxt) => {    
    const content = time +'\n'+ `Query: ${command}` +'\n'+ errorTxt + BREAKER;

    fs.writeFile('public/errorLog.txt', content, {flag: 'a+'}, err => {
        //console.logerr);
    });
}