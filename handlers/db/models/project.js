const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title:{type:String, required:true},
  videoUrl: {type:String, required:false},
  description:{type:String,required:true}
},{collection:"Projects"});

module.exports = mongoose.model('Project',projectSchema);