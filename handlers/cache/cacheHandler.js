const dbHandler = require('../db/dbHandler');
const logger = require('../logger/loggerHandler');
let cacheHandler = {};
cacheHandler.init = () => {};

cacheHandler.requestCacheInfo = () => {
  const projectIdList =  dbHandler.findPropertyOfAllDocumentsInCollection('project', '_id',{});
  const firstDisplayProjects = dbHandler.findManyDocumentsByProperty('project',{},16);
  try {
    return Promise.all([projectIdList,firstDisplayProjects]); 
  } catch (error) {
    logger.error(`Couldn't get info from database in cacheHandler: `, error);
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
    logger.error(`Couldnt get info from database in cacheHandler: `, error);
    return false;
  }
}

module.exports = cacheHandler;