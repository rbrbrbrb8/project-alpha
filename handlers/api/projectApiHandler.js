const dbHandler = require('../db/dbHandler');
const cacheService = require('../../services/cache/cacheService');
let projectApiHandler = {};
projectApiHandler.init = () => { };
const PROJECT = "project";
const logger = require('../logger/loggerHandler');

projectApiHandler.requestGetProject = async (id) => {
  console.log("doc id:" + id);
  try {
    return dbHandler.findOneDocumentById(PROJECT, id, "-bankAccount -bankBranchID -bankID"); //filter bank details!!!!!
  } catch (error) {
    console.log("error in projectApiHandler");
    return false;
  }


};

projectApiHandler.addDonationAmount = async (projectId, donationAmount, userID) => {
  console.log('donation amount in project api handler', donationAmount);
  try {
    const donation = {
      'projectID': projectId,
      'userID': userID,
      'donationAmount': donationAmount
    };
    const projectDocPromise = dbHandler.updateDocumentInCollection(PROJECT, { _id: projectId }, { $inc: { amountAlreadyRaised: donationAmount } });
    const projectDonationPromise = dbHandler.updateDocumentInCollection(PROJECT, { _id: projectId }, { $push: { usersDonated: userID } });
    const donationListPromise = dbHandler.addDocumentToDb('donation', donation);
    const userSupportPromise = dbHandler.updateDocumentInCollection('user', { _id: userID }, { $push: { supportedProjects: projectId } });
    const result = await Promise.all([
      donationListPromise,
      projectDocPromise,
      projectDonationPromise,
      userSupportPromise
    ]).catch(err => console.log(err))
    const finalRes = result.find(res => !res);
    console.log('finalRes', finalRes);
    console.log('result');
    console.log(result);
    return finalRes;
  } catch (error) {
    console.log(error);
    return false;
  }
};

projectApiHandler.addLike = async (projectId, userID) => {
  const projectLikePromise = dbHandler.updateDocumentInCollection(PROJECT, { _id: projectId }, { $push: { usersLiked: userID } });
  const userLikePromise = dbHandler.updateDocumentInCollection('user', { _id: userID }, { $push: { likedProjects: projectId } });
  const result = await Promise.all([projectLikePromise, userLikePromise]);
  const finalRes = result.reduce(res => res ? true : false);
  console.log(finalRes);
  return finalRes;
};

projectApiHandler.removeLike = async (projectId, userID) => {
  const doc = {
    'projectID': projectId,
    'userID': userID
  }
  const projectLikePromise = dbHandler.updateDocumentInCollection(PROJECT, { _id: projectId }, { $pull: { usersLiked: userID } });
  const userLikePromise = dbHandler.updateDocumentInCollection('user', { _id: userID }, { $pull: { likedProjects: projectId } });
  try {
    const result = await Promise.all([projectLikePromise, userLikePromise]);
    const finalRes = result.reduce(res => res ? true : false);
    console.log('finalRes: ', finalRes);
    return finalRes;
  }
  catch (err) {
    console.log('error in projectApiHandler');
  }
};

projectApiHandler.requestFirstProjectsFromCache = () => {
  return cacheService.retrieveManyByKeys(['firstProjects']);
};

projectApiHandler.requestItemFromCache = key => {
  const item = cacheService.retrieveOneByKey(key);
  console.log(key,item);
  if(!item){
    console.log('item in cache is empty, sending from db');
    const itemFromDb = cacheService.requestFromDbByKey(key);
    return itemFromDb;
  }
  return item;
}


projectApiHandler.requestAddProject = async (project, userID, username, thumbnail) => {
  console.log("project in route: " + Object.entries(project));
  const isValid = verifyProjectDetails(project) && verifyRewardsDetails(project.rewards);
  if (!isValid) return false;
  try {
    project.creatorUserID = userID;
    project.creatorUserName = username;
    const docThumbnail = dbHandler.createDocumentAndReturn('thumbnail', { thumbnail });
    project.thumbnailID = docThumbnail._id;
    const projectDocId = dbHandler.addDocumentToDb(PROJECT, project);
    docThumbnail.dataURL = thumbnail;
    const thumbnailOutcome = dbHandler.addCreatedDocumentToDb(docThumbnail);
    try {
      const res = await Promise.all([projectDocId, thumbnailOutcome]);
      logger.info(res);
      return {
        outcome: true
      };
    } catch (error) {
      return {
        outcome: false,
        err: error
      }
    }

  } catch (error) {
    logger.error(String(error));
    return false;
  }


};

const verifyProjectDetails = project => {
  const projInfoEntries = Object.entries(project);
  console.log(project);
  if (projInfoEntries.length < 8) {
    alert("need to fill the entire form");
    return false;
  }
  const isNoData = projInfoEntries.find(element => !element[1]);
  if (isNoData) {
    alert("need to fill the entire form");
    return false;
  }

  if (isNaN(project.amountToRaise)) {
    alert("amount must be number");
    return false;
  }
  const bankDetailEntries = [project.bankID, project.bankBranchID, project.bankAccount];
  const isBankDetailsNotValid = bankDetailEntries.find((detail, index) => !detail.match(`/^[0-9]{${2 + index * index}}$/`));
  return isBankDetailsNotValid;
}

const verifyRewardsDetails = rewards => {
  if (rewards.length === 0) {
    alert("need to include at least 1 reward/donation option");
    return false;
  }
  const isOneInvalid = rewards.find(reward => !checkSingleReward(reward));
  return !isOneInvalid;
}

const checkSingleReward = reward => {
  const rewardInfoEntries = Object.entries(reward);
  if (rewardInfoEntries.length < 3) {
    alert("need to fill all reward details");
    return false;
  }

  const isEmptyRewardDetails = rewardInfoEntries.find(rewardDetail => !rewardDetail[1]);
  if (isEmptyRewardDetails) {
    alert("need to fill all reward details");
    return false;
  }

  if (reward.donationAmount) {
    if (isNaN(reward.donationAmount)) {
      alert("donation must be number");
      return false;
    }
  }
  return true;
}


module.exports = projectApiHandler;