const dbHandler = require('../db/dbHandler');
const bcrypt = require('bcrypt');
let signUpHandler = {};
signUpHandler.init = () => { };

validateDetails = (username, password) => {
	let usernameValidator = new RegExp("^(?![0-9]{6})[0-9a-zA-Z]{6,8}$");
	let passwordValidator = new RegExp("^(?![0-9]{6})[0-9a-zA-Z]{8,12}$");
	return usernameValidator.test(username) && passwordValidator.test(password);
};

signUpHandler.requestRegistration = async (username, unHashedPassword) => {
	let isValid = validateDetails(username, unHashedPassword);
	if (!isValid) return false;
	const password = await bcrypt.hash(unHashedPassword, 10);
	try {
		const outcome = await dbHandler.addDocumentToDb("user", { username, password });
		console.log("success, in signUpHandler");
		return outcome;
	} catch (error) {
		console.log("error in signUpHandler");
		return false;
	}


};

module.exports = signUpHandler;