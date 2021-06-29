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

cacheHandler.requestCacheInfoSpecific = key => {
  const promiseObj = {};
  if(key === 'idList') promiseObj.promise =  dbHandler.findPropertyOfAllDocumentsInCollection('project', '_id',{});
  else promiseObj.promise = dbHandler.findManyDocumentsByProperty('project',{},16);
  try {
    return Promise.all([promiseObj.promise]); 
  } catch (error) {
    console.log('Couldnt get info from database in cacheHandler');
    return false;
  }
}

module.exports = cacheHandler;