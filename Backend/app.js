const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const  userRoutes = require("./routes/user");  
const bcrypt = require("bcrypt");  
const user = require("./models/users"); 
const videos = require("./models/videos"); 
const multer = require("multer");
const path = require('path')

// db connection
mongoose.connect("mongodb+srv://tiya:post24@cluster0.qh8z9se.mongodb.net/userdetails",{
   useNewUrlParser:true,
  useUnifiedTopology:true
});
console.log("Mongo DB connected ...")

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'assets/')
    // cb(null,path.join(__dirname,'../','Backend/assets/'));
  },
  filename: function (req, file, cb) {
    const extname = file.mimetype.split("/")[1];
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
})



const app = express();
app.use(express.static('assets'))
app.use(express.json());
app.use(cors());
app.use(bodyparser.json());
app.use("/api", userRoutes);  
app.use(express.urlencoded({extended:false}));

let upload = multer({ storage: storage }).single('file');
app.post("/uploadvideo",upload,(req,res,next)=>{
  const file = req.file
  console.log("file is",file.filename);
  if(!file){
    const error = new Error("please upload a file");
    console.log("file is",file);
    error.htppStatusCode = 400;
    return next(error)  
  }
  res.json(file)
})
//   upload(req,res,(err)=>{
//     if(err){
//       console.log(err)
//     }
//     console.log("in /uploadvideo:",req.file.path)
//     res.send(req.file);
//   })
// })

app.listen(3000);
console.log("port 3000");
// module.exports = app;