const dbHandler = require('../db/dbHandler');
const imageApiHandler = {};
imageApiHandler.init = () => { };
imageApiHandler.getImage = async id => {
	try {
		const image = dbHandler.findOneDocumentById('thumbnail',id,"dataURL");
		console.log(image);
		return image;
	}
	catch (e) {
		console.log("error in imageApi handler");
		console.log(e);
		return e;
	}
}

module.exports = imageApiHandler;