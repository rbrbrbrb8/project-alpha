const mongoose = require('mongoose');
const dbHandler = {};
const logger = require('../logger/loggerHandler');

mongoose.connect('mongodb+srv://rbrbrbrb8:rbpromongorb23@clusterproject.pzpyd.mongodb.net/ProjectDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
  logger.info('formed new connection to db');
});



function getModel(model) {

  return require('./models/' + model);
}

dbHandler.addDocumentToDb = async (modelName, document) => {
  const Model = getModel(modelName);
  const newDoc = new Model(document);
  const docId = newDoc._id;
  try {
    await newDoc.save();
    logger.info('saved new document to db of type ' + modelName);
    return docId;
  } catch (error) {
    logger.error(`error in adding document to db of type ${modelName}: `, error);
    return false;
  }
}

dbHandler.deleteDocumentInCollection = async (modelName, document) => {
  const Model = getModel(modelName);
  try {
    await Model.deleteOne(document)
    logger.info(`deleted document from db of type ${modelName}`);
    return true;
  } catch (error) {
    logger.error(`error in deleting document from db of type ${modelName}: `,error);
    return false;
  }
}

dbHandler.findManyDocumentsByProperty = async (modelName, propety, limit) => {
  const Model = getModel(modelName);
  try {
    const doc = await Model.find(propety).limit(limit);
    logger.info('pulled documents from database of type: ' + modelName);
    return doc;
  } catch (error) {
    logger.error(`couldn't find single document of ${modelName} in database, error: ${error}`);
    return error;
  }
}

dbHandler.findOneDocumentById = async (modelName, id, properties) => {
  const Model = getModel(modelName);
  try {
    const doc = await Model.findById(id, properties).catch((err) => logger.error(`couldn't find   `));
    if (!doc) return {found: false}
    const docFixed = doc['_doc'];
    logger.info("pulled single document from database of type: " + modelName);
    return docFixed;
  } catch (error) {
    logger.error(`couldn't find single document of ${modelName} in database, error: ${error}`);
    return error;
  }
}

dbHandler.updateDocumentInCollection = async (modelName, filter, update) => { //update must be an object
  const Model = getModel(modelName);
  try {
    const doc = await Model.findOneAndUpdate(filter,update,{useFindAndModify:false});
    logger.info(`updated document of type ${modelName}`);
    return true;
  } catch (error) {
    logger.error(`couldn't update document of type ${modelName}: `, error);
    return error;
  }
}

dbHandler.findOneDocumentByProperty = async (modelName, propety) => {
  const Model = getModel(modelName);
  try {
    const doc = await Model.findOne(propety);
    const docFixed = doc['_doc'];
    logger.info(`pulled one document from db of type ${modelName}`);
    return docFixed;
  } catch (error) {
    logger.error(`couldn't pull single document from db of type ${modelName}: `, error);
    return error;
  }
}

dbHandler.findPropertyOfAllDocumentsInCollection = async (modelName, property, filter) => {
  const Model = getModel(modelName);
  try {
    const propertyArr = await Model.find(filter, property);
    logger.info(`pulled property ${property} from documents of type ${modelName} in db`);
    return propertyArr;

  }
  catch (error) {
    logger.error(`couldn't pull property ${property} from documents of type ${modelName} in db: `, error);
    return false;
  }
}

module.exports = dbHandler;