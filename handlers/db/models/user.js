const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type:String, required:true},
  password: {type:String, required:true},
  isAdmin: {type:Boolean, default: false},
  projectsStarted: {type:Number,default:0},
  projectsSupported: {type:Number,default:0},
  totalMoneyRaised: {type:Number,default:0}
  // preferredCategories: [ObjectId], //array of ids from category model
  // preferredProjects:[ObjectId] //array of ids from project model 
},{collection:"Users"});

module.exports = mongoose.model('Users',userSchema);