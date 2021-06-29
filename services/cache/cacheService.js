const cacheHandler = require('../../handlers/cache/cacheHandler');
const NodeCache = require('node-cache');
const myCache = new NodeCache();
const cacheService = {};


cacheService.initCache = async () => {
  try {
    const [idList,firstProjectsList] = await cacheHandler.requestCacheInfo();
    myCache.mset([{key:'idList',val:idList,ttl:120,deleteOnExpire:false},{key:'firstProjects',val:firstProjectsList,ttl:5,deleteOnExpire:false}]);
    
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

myCache.on("expired",async (key,value) => {
  const resToUpdate = await cacheHandler.requestCacheInfo(key);
  myCache.mset(key,resToUpdate);
});




module.exports = cacheService