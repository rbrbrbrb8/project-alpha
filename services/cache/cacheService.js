const cacheHandler = require('../../handlers/cache/cacheHandler');
const NodeCache = require('node-cache');
const { async } = require('regenerator-runtime');
const Async = require('async');
const myCache = new NodeCache({checkperiod:10});
const cacheService = {};

cacheService.initCache = async () => {
  try {
    const [idList,firstProjectsList] = await cacheHandler.requestCacheInfo();
    myCache.mset([{key:'idList',val:idList,ttl:10,deleteOnExpire:false},{key:'firstProjects',val:firstProjectsList,ttl:10,deleteOnExpire:false}]);
  } catch (error) {
    
  }
}

cacheService.requestFromDbByKey = key => {
  return cacheHandler.requestCacheInfoSpecific(key);
}

cacheService.retrieveOneByKey = key => {
  const value = myCache.get(key);
  // console.log("cache value: ",value);
  return value;
}
cacheService.retrieveManyByKeys = keys => {
  const value = myCache.mget(keys);
  return value;
}


myCache.on("del", async (key,value) => {
  console.log('deleted cache')
  // console.log('expired'); replace with logger so it will be known that cache is renewed 
  const resToUpdate = await cacheHandler.requestCacheInfoSpecific(key);
  myCache.set(key,resToUpdate,10);

});




module.exports = cacheService