const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const donationSchema = new Schema({
  projectID: {type:String, required:true},
  user: {type:String,required:true},
  donationAmount:{type:Number,required:true}
},{collection:"Donations"});

module.exports = mongoose.model('Donations',donationSchema);