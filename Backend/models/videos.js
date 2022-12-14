const mongoose = require('mongoose');  
const userSchema = mongoose.Schema({  
     title:{type:String,required:true},
     videoName:{type:String,required:true},
     imageName:{type:String,required:true},
     subTitle:{type:String,required:true},
     dis:{type:String,required:true},
     rating:{type:String},
     reported:{type:Boolean}
  });  
   

  module.exports = mongoose.model('videofile',userSchema);  