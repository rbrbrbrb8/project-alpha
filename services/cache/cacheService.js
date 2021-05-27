const cacheHandler = require('../../handlers/cache/cacheHandler');
const NodeCache = require('node-cache');
const myCache = new NodeCache();
const cacheService = {};


cacheService.initCache = async () => {
  try {
    const [idList,firstProjectsList] = await cacheHandler.requestCacheInfo();
    myCache.mset([{key:'idList',val:idList},{key:'firstProjects',val:firstProjectsList}]);
    
  } catch (error) {
    
  }
}

cacheService.initCache();

cacheService.retrieveOneByKey = key => {
  const value = myCache.get(key);
  console.log("cache value: ",value);
  return value;
}
cacheService.retrieveManyByKeys = keys => {
  const value = myCache.mget(keys);
  console.log("cache values: ",value);
  return value;
}





module.exports = cacheService