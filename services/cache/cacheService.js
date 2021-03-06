const cacheHandler = require('../../handlers/cache/cacheHandler');
const NodeCache = require('node-cache');
const myCache = new NodeCache({checkperiod:10});
const cacheService = {};


cacheService.initCache = async () => {
  console.log('initing cache');
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

myCache.on("del",async (key,value) => {
  // console.log('expired'); replace with logger so it will be known that cache is renewed
  const resToUpdate = await cacheHandler.requestCacheInfoSpecific(key);
  myCache.set(key,resToUpdate[0],10);
});




module.exports = cacheService