const express=require("express");
const jwt = require('jsonwebtoken')
const router = express.Router();
const bcrypt = require("bcrypt");    
const user = require("../models/users");  
const users = require("../models/users");

var Role = "user"
router.get('/trial',(req,res)=>{
  res.send("trial");
})

// verify token
function verifyToken(req,res,next){
  if (!req.headers.authorization){
    return res.status(401).send('Unauthorized request')
  }

  let token = req.headers.authorization.split(" ")[1];
  console.log("token:",token)
  
  if (token =='null'){
  
    return res.status(401).send('Unauthorized request');
    
  }
  let payload = jwt.verify(token,'secret_key');
  console.log("payload",payload)
  if(!payload){
    return res.status(401).send('Unauthorized request');
  }
  req.userId = payload.subject;
  console.log("userid",payload.subject)
  next()
}
// signup details
router.post("/signup", (req, res, next) =>{  

  
  console.log("req.body:", req.body);
    console.log("email:", req.body.email);
    
    console.log("username:", req.body.Username);
    // console.log("role:", role)

    bcrypt.hash(req.body.password, 10)  
    .then( hash => {  
      const NewUser = user({ 
        username:req.body.Username, 
        email: req.body.email,  
        password: hash,
        role:Role
      });  
      
      user.findOne({ email: req.body.email })
      .then((user1) => {
        if (user1) {
          return res.status(401).json({
            message: "User Already Exist",
        });
        }
    
      NewUser.save()  
     .then(result =>{ 
      if (!result) {
        return res.send({
          message: "Error Creating USer",
        });
      } 

        if(result){
        //  let payload ={subject:user._id}
         let payload = { subject: req.body.email + req.body.password };
        let token = jwt.sign(payload,'secret_key')
        console.log("token in signup:",token)
        res.status(200).send({token})
       
      }
      
      // res.send({message:"success"});
    });
  })
  .catch((err) => {
    res.send({
      message: err,
    });
  });
// });
// });
      }); 
    
    })
 
// login

router.post("/login", (req, res, next) => {
  let fetchedUser;

  user.findOne({email:req.body.email}).then(user=>{
    console.log("user in login",req.body)
    if(!user){
      return res.status(401).json({
        message: "Auth failed no such user"
      })
    }
    fetchedUser=user;
    console.log("feteched user is:",fetchedUser)
    return bcrypt.compare(req.body.password, user.password);
  })

  .then((result)=>{
    // console.log("feteched user is:",fetchedUser)
    if(!result){
      return res.status(401).json({
        message: "Auth failed inccorect password"
      })
    }
    else{
      // let payload ={subject:user._id}
      let payload = { subject: req.body.email + req.body.password };
      let token = jwt.sign(payload,'secret_key')
      let message="success"
      // let user = req.body.Role
      console.log("token in login",token)
      console.log("username in login",fetchedUser.username)
      console.log("role in login:",fetchedUser.role)
      let catogery =fetchedUser.role
       let username = fetchedUser.username
       
      res.status(200).
        send({token,catogery,username,message})
      // res.status(200).send(fetchedUser)
    }
  })
})

router.get("/userlist",verifyToken,(req,res)=>{
  // let fetchedUser;
 
  user.find().then(function(users){
   
    res.send(users)
 
  });
});


router.put("/userlist/rolechangeadmin",verifyToken,(req,res)=>{
  const id = req.body.id;
user.findOneAndUpdate({_id:id}, { $set: {role:"admin"} })
.then(function(users){
  console.log("in put for makeadmin:",users)
  res.send(users)
})

})
router.put("/userlist/rolechangeuser",(req,res)=>{
  const id = req.body.id;
user.findOneAndUpdate({_id:id}, { $set: {role:"user"} })
.then(function(users){
  console.log("in put for makeadmin:",users)
  res.send(users)
})

})
module.exports = router;  