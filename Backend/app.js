const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const  userRoutes = require("./routes/user");  
const bcrypt = require("bcrypt");  
const user = require("./models/users"); 
const videos = require("./models/videos"); 
const multer = require("multer");
const path = require('path');
const { Console } = require("console");
const { findSourceMap } = require("module");

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
app.use(express.urlencoded({extended:true}));

let upload = multer({ storage: storage })
let Rating = '0';

    
  // to upload video
app.post("/uploadvideo",upload.array('file'),(req,res,next)=>{
//    const file = req.file
 console.log('file ',req.files[0])
 console.log("inside upload video api:",req.files[1])
 console.log('dis ',req.body.dis)

const multipleFiles= new videos({
  title:req.body.title,
  videoName:req.files[0].filename,
  imageName:req.files[1].filename,
  subTitle:req.files[2].filename,
  dis:req.body.dis,
  rating:Rating,
  reported:false
})
  
 multipleFiles.save()
  //  res.json( multipleFiles)
})

app.get('/getvideo/:videoname',(req,res)=>{
  const videoname= req.params.videoname
  console.log("videoname in app get",videoname)
  videos.findOne({videoName:videoname}).then((file)=>{
    res.send(file)
  })
})

// to get all videos
app.get('/getimage',(req,res)=>{
  console.log("hi getimage")

  videos.find().then((videofile)=>{

  console.log("get all files:",videofile)

  res.json(videofile)
})
})

// to play a single video while clicking the image
app.get('/playvideo/:id',(req,res)=>{
  console.log("playvideo api");
  const id = req.params.id;
  videos.findById({_id:id}).then((videofile)=>{
    console.log("get one video:",videofile);
    res.json(videofile)
  })
})
// to delete a particular video

app.delete('/deletevideo/:id',(req,res)=>{
  console.log("delete video")
  const id = req.params.id;
  videos.findByIdAndDelete({_id:id}).then(function(videofile){
    res.send(videofile)
  })
})

// to add rating of each user to db

app.put('/addrating',(req,res)=>{
  const id = req.body.id;
  console.log("inside addrating api",id)
  var rating = req.body.rating;
  console.log("inside addrating api",rating);
  videos.findByIdAndUpdate({_id:id},{$set:{rating:rating}}).then(function(videofile){
    res.send(videofile);
  })
})

// to report video
app.put('/reportedvideo',(req,res)=>{
  const id = req.body.videoid;
  console.log("inside report api",req.body.videoid);

  videos.findByIdAndUpdate({_id:id},{$set:{reported:true}}).then(function(videofile){
    res.send(videofile);
  })
})

// to see all videos in the issue component

app.get('/issuevideo',(req,res)=>{
  console.log("inside issues api")
  const id = req.params.id;
  videos.find({reported:true}).then((videofile)=>{
    console.log("get one video:",videofile);
    res.json(videofile)
  })
})
app.listen(3000);
console.log("port 3000");
// module.exports = app;