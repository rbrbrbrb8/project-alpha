const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const donationListSchema = new Schema({
  projectID: {type:String, required:true},
  usersDonated: {type:Array,default:[]}
},{collection:"Donations"});

module.exports = mongoose.model('Donations',donationListSchema);