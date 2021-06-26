const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeListSchema = new Schema({
  projectID: {type:String, required:true},
  usersLiked: {type:Array,default:[]}
},{collection:"Likes"});

module.exports = mongoose.model('Likes',likeListSchema);