const mongoose = require('mongoose');
const db = mongoose.connection;
const dbHandler = {};

function getModel(model)
{
  
  return require('./models/' + model);
}

dbHandler.addDocumentToDb = (modelName,document) => {
  let outcome;
  const Model = getModel(modelName);
  const newDoc = new Model(document);
  console.log("modelname:" + modelName);
  console.log("document:" + newDoc);
  newDoc.save().then(savedDoc => {
    console.log("saved successfully to db");
    outcome = true;
  }).catch(err => {
    console.log("something went wrong in dbHandler");
    outcome = false;

  });
  console.log("outcome:" + outcome);
  
}

module.exports = dbHandler;