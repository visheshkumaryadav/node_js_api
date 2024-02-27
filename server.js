const express = require('express');
var cors = require('cors');
const bodyparser = require('body-parser')
const http = require('http');
const app = require('./app.js');
const server = http.createServer(app)
const connection = require("./config/db.js")
// var io=require('socket.io')(server)

const routs = express();

// const io = new Server(server, {
//     cors: {
//       origin: "*",
//       methods: ["GET", "POST"]
//     }
//   });

// io.on("connection",(socket)=>{
//    console.log("connected");
//    console.log(socket.id," has joined");
//    socket.on("/test",(msg)=>{
//     console.log(msg);
//    })
// });

const port = process.env.PORT || 5000

server.listen(port, () => console.log(`PORT NUMBER === http://localhost:${port}`)).on("error", function (err) {
    const { exec } = require('child_process');
    console.log("killed")

    exec('command here', { 'shell': 'powershell.exe' }, (error, stdout, stderr) => {
        stdout = `npx kill-port ${port}`
        // console.log("killed 2", stdout)
    })
});
