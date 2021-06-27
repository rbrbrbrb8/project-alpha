const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  projectID: {type:String, required:true},
  userID: {type:String,required:true}
},{collection:"Likes"});

module.exports = mongoose.model('Likes',likeSchema);