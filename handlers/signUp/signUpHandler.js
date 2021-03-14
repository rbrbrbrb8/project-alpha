const dbHandler = require('../db/dbHandler');
const bcrypt = require('bcrypt');
let signUpHandler = {};
signUpHandler.init = () => {};

validateDetails = (username,password) => {
    let usernameValidator = new RegExp("^(?![0-9]{6})[0-9a-zA-Z]{6,8}$");
    let passwordValidator = new RegExp("^(?![0-9]{6})[0-9a-zA-Z]{8,12}$");
    return usernameValidator.test(username) && passwordValidator.test(password);
};

<<<<<<< HEAD
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
=======
signUpHandler.requestRegistration = async (username,unHashedPassword) =>{
   let isValid = validateDetails(username,unHashedPassword);
    if(!isValid) return false;
    const password = await bcrypt.hash(unHashedPassword,10);
    try {
        const outcome = await dbHandler.addDocumentToDb("user",{username,password});
        console.log("success, in signUpHandler");
        return true;
    } catch (error) {
        console.log("error in signUpHandler");
        return error;
    }
    
   
>>>>>>> my-temp-work
};

module.exports = signUpHandler;