const mongoose = require('mongoose');
const db = mongoose.connection;
const dbHandler = {};

function getModel(model)
{
  
  return require('./models/' + model);
}

dbHandler.addDocumentToDb = (modelName,document) => {
  const Model = getModel(modelName);
  const newDoc = new Model(document);
  newDoc.save().then(savedDoc => {
    console.log("saved successfully to db");
  });
}

module.exports = dbHandler;