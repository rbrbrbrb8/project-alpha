const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name:{type:String, required:true},
  iconClassName:{type:String,default:"fas fa-bullseye"}, //reference to fontawesome icon class
  order:{type:Number,default:0} //used for ordering the categories in the list, from low to high
},{collection:"Categories"});

module.exports = mongoose.model('Category',categorySchema);