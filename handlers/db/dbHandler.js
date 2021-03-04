const mongoose = require('mongoose');
const db = mongoose.connection;
const dbHandler = {};

function getModel(model)
{
  console.log()
  return require('./models/' + model);
}

dbHandler.addDocumentToDb = (modelName,document) => {
  const Model = getModel(modelName);
  console.log(String(Model));
  const newDoc = new Model(document);
  db.collection(String(Model.prototype.collection)).insertOne(newDoc).then(resolve => {
    console.log("successful insertion to" + String(Model.prototype.collection));
  });
}

module.exports = dbHandler;