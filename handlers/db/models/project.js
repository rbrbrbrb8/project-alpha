const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  creatorUser:{type:String,required:true},
  creationDate:{type:Object,default:new Date(),immutable:true},
  title:{type:String, required:true},
  amountToRaise:{type:Number,required:true},
  amountAlreadyRaised:{type:Number,required:false,default:0},
  category:{type:String,required:true},
  videoUrl: {type:String, required:false},
  projectDescription:{type:String,required:true},
  deadlineDate:{type:Object,required:true},
  rewards:{type:Array,required:true},
  bankID:{type:String,required:true},
  bankBranchID:{type:String,required:true},
  bankAccount:{type:String,required:true}

},{collection:"Projects"});

module.exports = mongoose.model('Project',projectSchema);