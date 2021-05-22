const dbHandler = require('../db/dbHandler');
const bcrypt = require('bcrypt');
let projectApiHandler = {};
projectApiHandler.init = () => { };
projectApiHandler.getAllProjectsIdList = filter => {
    try {
        const idArray = await dbHandler.findManyDocumentsByProperty("Projects", filter);
    }
    catch(e){
        console.log("error in allProjectsApi handler");
        return e;
    }
}




module.exports = projectApiHandler;