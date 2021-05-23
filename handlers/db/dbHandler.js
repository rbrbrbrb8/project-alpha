const mongoose = require('mongoose');
const db = mongoose.connection;
const dbHandler = {};
const userModel = require('./models/user');
function getModel(model)
{
  
  return require('./models/' + model);
}

dbHandler.addDocumentToDb = async (modelName,document) => {
  console.log(document);
  const Model = getModel(modelName);
  const newDoc = new Model(document);
  try {
    
    await newDoc.save();
    console.log("saved successfully to db");
    return true;
  } catch (error) {
    console.log("couldn't save in db");
    return false;
  }
  
 
}

dbHandler.findManyDocumentsByProperty = async (modelName,propety) => {
  const Model = getModel(modelName);
  try {
    const doc = await Model.find(propety);
    console.log("found doc: " + doc);
    return doc;
  } catch (err) {
    console.log("couldn't find anything");
    return err;
  }
}

dbHandler.findOneDocumentByProperty = async (modelName,propety) => {
  const Model = getModel(modelName);
  try {
    const doc = await Model.findOne(propety);
    const docFixed = doc['_doc'];
    console.log("found doc: " + doc);
    return docFixed;
  } catch (err) {
    console.log("couldn't find single document",err);
    return err;
  }
}

dbHandler.findPropertyOfAllDocumentsInCollection = async (modelName,property,filter) => {
  const Model = getModel(modelName);
  try{
    const propertyArr = await Model.find(filter,property);
    // console.log("filter= " + filter);
    // console.log(propertyArr);
    return propertyArr;

  }
  catch(err){
    return false;
  }
}

module.exports = dbHandler;