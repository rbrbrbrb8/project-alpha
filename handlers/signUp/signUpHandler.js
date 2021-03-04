const dbHandler = require('../db/dbHandler');
let signUpHandler = {};
signUpHandler.init = () => {};

validateDetails = (username,password) => {
    let usernameValidator = new RegExp("^(?![0-9]{6})[0-9a-zA-Z]{6,8}$");
    let passwordValidator = new RegExp("^(?![0-9]{6})[0-9a-zA-Z]{8,12}$");
    return usernameValidator.test(username) && passwordValidator.test(password);
};

signUpHandler.requestRegistration = (username,password) =>{
   let isValid = validateDetails(username,password);
   if(isValid){
    dbHandler.addDocumentToDb("user",{username,password});
    return "valid credentials - inserting into db...";
   }
   else{
    return "invalid credentials - user should try again";
   }
};

module.exports = signUpHandler;