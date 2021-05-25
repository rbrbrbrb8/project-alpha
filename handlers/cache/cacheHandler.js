const dbHandler = require('../db/dbHandler');
let cacheHandler = {};
cacheHandler.init = () => {};

cacheHandler.requestCacheInfo = async () => {
  const projectIdList =  dbHandler.findPropertyOfAllDocumentsInCollection('project', '_id',filter);
  const firstDisplayProjects = dbHandler.findManyDocumentsByProperty('project',{},16);
  try {
    return Promise.all([projectIdList,firstDisplayProjects]); 
    console.log('Cache result',result);
    return result;
  } catch (error) {
    console.log('Couldnt get info from database in cacheHandler');
    return false;
  }
}
