const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type:String, required:true},
  password: {type:String, required:true},
  isAdmin: {type:Boolean, default: false},
  likedProjects: {type:Array,default:[]},
  supportedProjects: {type:Array,default:[]}
  // preferredCategories: [ObjectId], //array of ids from category model
  // preferredProjects:[ObjectId] //array of ids from project model 
},{collection:"Users"});

module.exports = mongoose.model('Users',userSchema);