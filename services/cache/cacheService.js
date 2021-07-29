const cacheHandler = require('../../handlers/cache/cacheHandler');
const NodeCache = require('node-cache');
const { async } = require('regenerator-runtime');
const Async = require('async');
const myCache = new NodeCache({checkperiod:10});
const cacheService = {};


cacheService.initCache = async () => {
  try {
    const [idList,firstProjectsList] = await cacheHandler.requestCacheInfo();
    myCache.mset([{key:'idList',val:idList,ttl:120,deleteOnExpire:false},{key:'firstProjects',val:firstProjectsList,ttl:120,deleteOnExpire:false}]);
  } catch (error) {
    
  }
}



cacheService.retrieveOneByKey = key => {
  const value = myCache.get(key);
  console.log("cache value: ",value);
  return value;
}
cacheService.retrieveManyByKeys = keys => {
  const value = myCache.mget(keys);
  // const value = await checkGetManyFromCache(keys);
  // console.log("cache values: ",value);
  return value;
}
 
const test = async keys => {
  const value = myCache.mget(keys);
  if(Object.values(value).length === 0) throw new Error('no info in cache');
  else return value;
}
const checkGetManyFromCache = keys => {
  Async.retry({times:5,interval:1000},test,(err,res) => {
    console.log('attempt');
  });
}

myCache.on("del", async (key,value) => {
  console.log('deleted cache')
  // console.log('expired'); replace with logger so it will be known that cache is renewed 
  const resToUpdate = await cacheHandler.requestCacheInfoSpecific(key);
  console.log('updated cache')
  return myCache.set(key,resToUpdate[0],10);
});




module.exports = cacheService