const mysql = require('mysql');

var connection = mysql.createPool({
    host: "192.168.1.123",
    user: "root",
    password: "Dnpl@2015",
    database: "aman_practice",
    port: 3309,
    dateStrings: true,
    multipleStatements: true,
});


connection.getConnection(function (err) {
    // //console.log"Connected Error", err); // true
    if (err) throw err;
    console.log("Database Connected");
});

connection.on('error', function (err) {
    // console.error('Database error:', err);
    connection.destroy(); // destroy the connection to prevent it from being reused
});

module.exports = connection;