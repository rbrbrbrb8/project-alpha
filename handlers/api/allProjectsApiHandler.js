const dbHandler = require('../db/dbHandler');
const bcrypt = require('bcrypt');
let projectApiHandler = {};
projectApiHandler.init = () => { };
projectApiHandler.getAllProjectsIdList = async filter => {
    try {
        const idArrayObjects = await dbHandler.findPropertyOfAllDocumentsInCollection("Project", "_id",filter);
        const ids = idArrayObjects.map(element => element._id);
        return idArrayObjects;
    }
    catch(e){
        console.log("error in allProjectsApi handler");
        console.log(e);
        return e;
    }
}




module.exports = projectApiHandler;