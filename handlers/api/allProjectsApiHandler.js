const dbHandler = require('../db/dbHandler');
const projectApiHandler = {};
projectApiHandler.init = () => { };
projectApiHandler.getAllProjectsIdList = filter => {
	try {
		return dbHandler.findPropertyOfAllDocumentsInCollection("project", "_id", filter);
	}
	catch (e) {
		console.log("error in allProjectsApi handler");
		console.log(e);
		return e;
	}
}

projectApiHandler.getFirstProjectsAndIdList = filter => {
	const projectIdList = dbHandler.findPropertyOfAllDocumentsInCollection('project', '_id', filter);
	const firstDisplayProjects = dbHandler.findManyDocumentsByProperty('project', filter, 5);
	try {
		return Promise.all([projectIdList, firstDisplayProjects]);
	} catch (error) {
		console.log('Couldnt get info from database in allProjectsApiHandler');
		return false;
	}
}




module.exports = projectApiHandler;