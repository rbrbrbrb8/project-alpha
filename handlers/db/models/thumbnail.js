const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const thumbnailSchema = new Schema({
  dataURL: {type:String,required:true}
},{collection:"Thumbnails"});

module.exports = mongoose.model('Thumbnails',thumbnailSchema);