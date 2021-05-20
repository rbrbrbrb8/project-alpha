const dbHandler = require('../db/dbHandler');
const bcrypt = require('bcrypt');
let projectApiHandler = {};
projectApiHandler.init = () => { };

projectApiHandler.requestAddProject = async (project, username) => {
  let isValid = verifyProjectDetails(project) && verifyRewardsDetails(project.rewards);
  if (!isValid) return false;
  try {
    project.creatorUser = username;
    const outcome = await dbHandler.addDocumentToDb("project", project);
    console.log("success, in projectApiHandler");
    return outcome;
  } catch (error) {
    console.log("error in projectApiHandler");
    return false;
  }


};

const verifyProjectDetails = project => {
  const projInfoEntries = Object.entries(project);
  console.log(projInfoEntries);
  if (projInfoEntries.length < 8) {
    alert("need to fill the entire form");
    return false;
  }
  projInfoEntries.forEach(element => {
    if (!element[1]) {
      alert("need to fill the entire form");
      return false;
    }
  });
  const amountEntry = projInfoEntries.find(element => element[0] === "amount");
  if (isNaN(amountEntry[1])) {
    alert("amount must be number");
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
  if (rewards.length === 0) {
    alert("need to include at least 1 reward/donation option");
    return false;
  }
  rewards.forEach(reward => {
    const rewardInfoEntries = Object.entries(reward);
    if (rewardInfoEntries.length < 3) {
      alert("need to fill all reward details");
      return false;
    }
    rewardInfoEntries.forEach(element => {
      if (!element[1]) {
        alert("need to fill all reward details");
        return false;
      }
    });
    const donationEntry = rewardInfoEntries.find(element => element[0].includes("donation"));
    if (isNaN(donationEntry[1])) {
      alert("donation must be number");
      return false;
    }

  });
  return true;
}


module.exports = signUpHandler;