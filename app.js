const express = require("express");
const app = express();
const multer = require("multer");
const cors = require('cors');
const fs = require('fs');
app.use(cors());
app.use(express.json());
const login = require('./api/login.js')
const { execCommand } = require('./config/cmdExecution.js');
const { logWriter } = require('./config/errorWrite');
const { table } = require("console");

// const upload=multer({
//     storage:multer.diskStorage({
//         destination:function(req, file,cb){
//             cb(null,"\\\\192.168.1.123\\ngdata\\kazyplayimages\\Vishesh\\")
//         },
//         filename:function(req ,file,cb){
//             console.log("file data is", req,file.originalname);
//             // cb(null,file.originalname+Date.now());
//             cb(null,file.originalname.split(".")[0]+ "_"+Date.now()+"."+file.originalname.split(".")[1])

//         }
//     })
// }).single("image");



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    filepath = "\\\\192.168.1.123\\ngdata\\kazyplayimages\\Vishesh\\";
    // cb(null,"\\\\192.168.1.123\\ngdata\\kazyplayimages\\Vishesh\\")
    console.log('filepath', filepath);
    if (!fs.existsSync(filepath)) {
      fs.mkdirSync(filepath, { recursive: true });
      cb(null, filepath);
    } else {
      cb(null, filepath);
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage, preservePath: true })

function fileupload(req, res, next) {
  upload.array("image")(req, res, next);
  next();
  res.json('success')
}

app.use("/upload",fileupload,(req,res)=>{
  console.log("Working");
})


app.use("/updateimages", fileupload, (req, res) => {
  console.log("Images updated successfully");
  
});

app.use('/register', (req, res) => {
  console.log(req.body);
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var designation = req.body.designation;
  var location = req.body.location;
  var image = req.body.image;

  var sql = `insert into vishesh (user_name, email, password, designation, location,img_path, create_time) values ('${username}','${email}','${password}','${designation}','${location}','${image}',now())`;
  console.log(sql);
  execCommand(sql).then(
    res.json('success')
  )
    .catch(err =>
      logWriter(sql, err, res.json(err))
    )
});

app.use('/save', (req, res) => {
  console.log(req.body);
  var image = req.body.image;
  var sname = req.body.sname;
  var Class = req.body.Class;
  var subject = req.body.subject;
  var address = req.body.address;
  var pcode = req.body.pcode;
  var dob = req.body.dob;

  var sql = `insert into userData (Image,Student_Name, Class, Subject,Address, Pin_Code,Date_of_Birth) values('${image}','${sname}','${Class}','${subject}','${address}','${pcode}','${dob}')`;
  console.log(sql);
  execCommand(sql).then(
    res.json('success')
  )
    .catch(err =>
      logWriter(sql, err, res.json(err))
    )
});

app.use('/show', (req, res,) => {

  var sql = `SELECT * FROM userdata`;
  console.log(sql);
  execCommand(sql).then((result) => {
    if (result.length > 0) {
      res.json(result);
    } else {
      res.json("error");
    }
  })
    .catch(err =>
      logWriter(sql, err, res.json(err))
    )
});

app.use('/shows', (req, res) => {
  console.log("request is",req.body)
  const Student_Id = req.body.Student_Id;
  var sql = `SELECT * FROM userdata WHERE Student_Id = ${Student_Id}`;
  console.log("data by id is",sql);
  execCommand(sql)
    .then((result) => {
      if (result.length > 0) {
        res.json(result);
      } else {
        res.json("No user found with the given ID");
      }
    })
    .catch(err =>
      logWriter(sql, err, res.json(err))
    );
});



app.use('/delete', (req, res) => {
  console.log("kuch bhi");
  const Student_Id = req.body.Student_Id;
  const sql = `DELETE FROM userData WHERE Student_Id = ${Student_Id}`;
  console.log(sql);
  execCommand(sql)
    .then(result => {
      if (result.affectedRows > 0) {
        res.json({ message: 'Record deleted successfully' });
      } else {
        res.status(404).json({ error: 'Record not found' });
      }
    })
    .catch(err => {
      logWriter(sql, err, res.status(500).json({ error: 'Internal server error' }));
    });
});
app.use('/updateStudent', (req, res) => {
  console.log("UPdate Data = ",req.body); 
  const Student_Id = req.body.Student_Id;
  var image = req.body.image;
  var sname = req.body.sname;
  var Class = req.body.Class;
  var subject = req.body.subject;
  var address = req.body.address;
  var pcode = req.body.pcode;
  var dob = req.body.dob;

  var sql = `UPDATE userData SET image='${image}', Student_Name='${sname}', Class='${Class}', Subject='${subject}', Address='${address}', Pin_Code='${pcode}', Date_of_Birth='${dob}' WHERE Student_Id='${Student_Id}'`;
  console.log("sssss",sql);
  execCommand(sql).then((result) => {
    // console.log(result);
   res.json("success")
  })
    .catch(err =>
      logWriter(sql, err, res.json(err))
    )
});


app.use('/login', (req, res) => {
  console.log(req.body);
  var email = req.body.email;
  var password = req.body.password;
  var sql = `select * from vishesh where email='${email}' and  password='${password}'`;
  console.log(sql);
  execCommand(sql).then((result) => {
    if (result.length > 0) {
      res.json(result);
    } else {
      res.json("error");
    }
  })
    .catch(err =>
      logWriter(sql, err, res.json(err))
    )
});



module.exports = app;