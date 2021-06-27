const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  creatorUserID:{type:String,required:true},
  creatorUserName:{type:String,required:true},
  creationDate:{type:Object,default:new Date().toLocaleDateString("en-GB"),immutable:true},
  title:{type:String, required:true},
  amountToRaise:{type:Number,required:true},
  amountAlreadyRaised:{type:Number,required:false,default:0},
  category:{type:String,required:true},
  videoUrl: {type:String, required:false},
  projectDescription:{type:String,required:true},
  deadlineDate:{type:Object,required:true},
  rewards:{type:Array,required:true},
  usersLiked:{type:Array,default:[]},
  usersDonated:{type:Array,default:[]},
  bankID:{type:String,required:true},
  bankBranchID:{type:String,required:true},
  bankAccount:{type:String,required:true}

},{collection:"Projects"});

module.exports = mongoose.model('Project',projectSchema);