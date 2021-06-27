const dbHandler = require('../db/dbHandler');
const cacheService = require('../../services/cache/cacheService');
let projectApiHandler = {};
projectApiHandler.init = () => { };
const PROJECT = "project";

projectApiHandler.requestGetProject = async (id) => {
  console.log("doc id:" + id);
  try {
    const project = await dbHandler.findOneDocumentById(PROJECT,id,"-bankAccount -bankBranchID -bankID"); //filter bank details!!!!!
    return project;  
  } catch (error) {
    console.log("error in projectApiHandler");
    return false;
  }
  
  
};

projectApiHandler.addDonationAmount = async (projectId,donationAmount,userID) => {
  console.log('donation amount in project api handler',donationAmount);
  try {
    const projectDocPromise = dbHandler.updateDocumentInCollection(PROJECT,{_id:projectId},{$inc:{amountAlreadyRaised: donationAmount}});
    const projectDonationPromise = dbHandler.updateDocumentInCollection(PROJECT,{_id:projectId},{$push:{usersDonated:userID}});
    const donation = {
      'projectID':projectId,
      'userID':userID,
      'donationAmount':donationAmount
    };
    const donationListPromise = dbHandler.addDocumentToDb('donation',donation);
    const result = await Promise.all([donationListPromise,projectDocPromise,projectDonationPromise]);
    console.log(result);
  } catch (error) {
    console.log(error);
    return false;
  }
};

projectApiHandler.addLike = async (projectId,userID) => {
  const doc = {
    'projectID':projectId,
    'userID':userID
  }
  const likePromise = dbHandler.addDocumentToDb('like',doc);
  const projectLikePromise = dbHandler.updateDocumentInCollection(PROJECT,{_id:projectId},{$push:{usersLiked:userID}});
  const result = await Promise.all([likePromise,projectLikePromise]);
};


projectApiHandler.requestFirstProjectsFromCache = () => {
  return cacheService.retrieveManyByKeys(['firstProjects']);
};

projectApiHandler.requestAddProject = async (project, userID,username) => {
  console.log("project in route: " + Object.entries(project));   
  let isValid = verifyProjectDetails(project) && verifyRewardsDetails(project.rewards);
  if (!isValid) return false;
  try {
    project.creatorUserID = userID;
    project.creatorUserName = username;
    const docId = await dbHandler.addDocumentToDb(PROJECT, project);
    const donationPromise = dbHandler.addDocumentToDb('donationList',{projectID:docId});
    const likesPromise = dbHandler.addDocumentToDb('likesList',{projectID:docId});
    const result = await Promise.all([donationPromise,likesPromise]);
    console.log("success, in projectApiHandler",result);
    return docId;
  } catch (error) {
    console.log("error in projectApiHandler");
    return false;
  }


};

const verifyProjectDetails = project => {
  const projInfoEntries = Object.entries(project);
  console.log(projInfoEntries);
  if (projInfoEntries.length < 8) {
    return false;
  }
  projInfoEntries.forEach(element => {
    if (!element[1]) {
      return false;
    }
  });
  const amountEntry = projInfoEntries.find(element => element[0].includes("amount"));
  if (isNaN(amountEntry[1])) {
    return false;
  }

  const bankDetailEntries = projInfoEntries.filter(element => element[0].includes("bank"));
  bankDetailEntries.forEach((element, i) => {
    const validator = new RegExp(`^[0-9]{${2 + i * i}}$`);
    if (validator.test(element[1])) return false;
  })
  return true;
}

const verifyRewardsDetails = rewards => {
  let isValid = true;
  if (rewards.length === 0) {
    alert("need to include at least 1 reward/donation option");
    return false;
  }
  rewards.forEach(reward => {
    const rewardInfoEntries = Object.entries(reward);
    if (rewardInfoEntries.length < 3) {
      alert("need to fill all reward details");
      isValid = false;
    }
    rewardInfoEntries.forEach(element => {
      if (!element[1]) {
        alert("need to fill all reward details");
        isValid = false;
      }
    });
    const donationEntry = rewardInfoEntries.find(element => element[0].includes("donation"));
    if (donationEntry) {
      if (isNaN(donationEntry[1])) {
        alert("donation must be number");
        isValid = false;
      }
    }

  });
  return isValid;
}      


module.exports = projectApiHandler;