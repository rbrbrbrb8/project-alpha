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
<<<<<<< HEAD
  newDoc.save().then(savedDoc => {
    console.log("saved successfully to db!");
  });
=======
  try {
    await newDoc.save();
    console.log("saved successfully to db");
    return true;
  } catch (error) {
    console.log("couldn't save in db");
    return error;
  }
  
 
>>>>>>> cd7dd93a2f932b047915a3856265f52f01f1f7f3
}

module.exports = dbHandler;