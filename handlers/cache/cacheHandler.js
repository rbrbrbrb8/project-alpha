const dbHandler = require('../db/dbHandler');
let cacheHandler = {};
cacheHandler.init = () => {};

cacheHandler.requestCacheInfo = () => {
  const projectIdList =  dbHandler.findPropertyOfAllDocumentsInCollection('project', '_id',{});
  const firstDisplayProjects = dbHandler.findManyDocumentsByProperty('project',{},16);
  try {
    return Promise.all([projectIdList,firstDisplayProjects]); 
  } catch (error) {
    console.log('Couldnt get info from database in cacheHandler');
    return false;
  }
}
module.exports = cacheHandler;