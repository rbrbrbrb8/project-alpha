const mongoose = require('mongoose');
const db = mongoose.connection;

function getModel(collection)
{
  return require('./models/' + collection);
}

function addDocumentToDb(collection,document)
{
  const Model = getModel(collection);
  const newDoc = new Model(document);
  db.collection(collection).insertOne(newDoc).then()
}