const mongoose = require('mongoose');
const dbHandler = {};

mongoose.connect('mongodb+srv://rbrbrbrb8:rbpromongorb23@clusterproject.pzpyd.mongodb.net/ProjectDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
  console.log('were connected');
});



function getModel(model) {

  return require('./models/' + model);
}

dbHandler.addDocumentToDb = async (modelName, document) => {
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

dbHandler.findManyDocumentsByProperty = async (modelName, propety, limit) => {
  const Model = getModel(modelName);
  try {
    const doc = await Model.find(propety).limit(limit);
    console.log("found documents with limit: " + doc);
    return doc;
  } catch (err) {
    console.log("couldn't find anything");
    return err;
  }
}

dbHandler.findOneDocumentById = async (modelName, id, properties) => {
  const Model = getModel(modelName);
  try {
    const doc = await Model.findById(id, properties);
    const docFixed = doc['_doc'];
    console.log("found doc: " + doc);
    return docFixed;
  } catch (err) {
    console.log("couldn't find single document", err);
    return err;
  }
}

dbHandler.updateDocumentByIdInCollection = async (modelName, id, update) => { //update must be an object
  const Model = getModel(modelName);
  try {
    await Model.findOneAndUpdate({_id:id},update,{useFindAndModify:false});
    console.log("updated single document successfully");
    return true;
  } catch (err) {
    console.log("couldn't update single document", err);
    return err;
  }
}

dbHandler.findOneDocumentByProperty = async (modelName, propety) => {
  const Model = getModel(modelName);
  try {
    const doc = await Model.findOne(propety);
    const docFixed = doc['_doc'];
    console.log("found doc: " + doc);
    return docFixed;
  } catch (err) {
    console.log("couldn't find single document", err);
    return err;
  }
}

dbHandler.findPropertyOfAllDocumentsInCollection = async (modelName, property, filter) => {
  const Model = getModel(modelName);
  try {
    const propertyArr = await Model.find(filter, property);
    // console.log("filter= " + filter);
    // console.log(propertyArr);
    return propertyArr;

  }
  catch (err) {
    console.log(err);
    return false;
  }
}

module.exports = dbHandler;