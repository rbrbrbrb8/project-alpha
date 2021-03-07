const dbHandler = require('../db/dbHandler');
const bcrypt = require('bcrypt');
let signUpHandler = {};
signUpHandler.init = () => {};

validateDetails = (username,password) => {
    let usernameValidator = new RegExp("^(?![0-9]{6})[0-9a-zA-Z]{6,8}$");
    let passwordValidator = new RegExp("^(?![0-9]{6})[0-9a-zA-Z]{8,12}$");
    return usernameValidator.test(username) && passwordValidator.test(password);
};

signUpHandler.requestRegistration = async (username,password) =>{
   let isValid = validateDetails(username,password);
   if(isValid){
       try{
            const hashedPassword =bcrypt.hashSync(password,10);
            console.log("username: " + username + ",password:" + hashedPassword);
            const isSuccessful = dbHandler.addDocumentToDb("user",{username,password});
            console.log("valid credentials - inserting into db...");
            return new Promise((resolve,reject) => {
                if(isSuccessful){
                    resolve();
                }
                else{
                    reject('Error:something went wrong');
                }
            })
       }catch(err){
            console.log(err);
       }
   }
   else{
     console.log("invalid credentials - user should try again");
   }
};

module.exports = signUpHandler;