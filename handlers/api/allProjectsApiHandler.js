const dbHandler = require('../db/dbHandler');
let projectApiHandler = {};
projectApiHandler.init = () => { };
projectApiHandler.getAllProjectsIdList = async filter => {
	try {
		const idArrayObjects = await dbHandler.findPropertyOfAllDocumentsInCollection("project", "_id", filter);
		return idArrayObjects;
	}
	catch (e) {
		console.log("error in allProjectsApi handler");
		console.log(e);
		return e;
	}
}

projectApiHandler.getFirstProjectsAndIdList = filter => {
	const projectIdList =  dbHandler.findPropertyOfAllDocumentsInCollection('project', '_id',filter);
	const firstDisplayProjects = dbHandler.findManyDocumentsByProperty('project',filter,5);
	try {
		return Promise.all([projectIdList,firstDisplayProjects]); 
	  } catch (error) {
		console.log('Couldnt get info from database in allProjectsApiHandler');
		return false;
	  }
}




module.exports = projectApiHandler;