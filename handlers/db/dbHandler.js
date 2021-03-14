const mongoose = require('mongoose');
const db = mongoose.connection;
const dbHandler = {};

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
    return error;
  }
  
 
}

dbHandler.findDocumentByProperty = async (modelName,propety) => {
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

module.exports = dbHandler;