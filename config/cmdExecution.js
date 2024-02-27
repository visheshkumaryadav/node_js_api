const connection = require('../config/db');

module.exports.execCommand = (command) => {
    return new Promise((resolve, reject) => {
        connection.query(command, (err, result) => {
            if(err) reject(err); 
            else resolve(result);
        });
    });    
}