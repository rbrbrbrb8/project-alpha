const path = require('path');

module.exports = {
  entry: {
    addProject:'./static/apps/addProject/AddProjectApp.js',
    homepage:'./static/apps/homepage/homepageApp.js',
    login:'/static/apps/login/loginApp.js',
    projectsGeneral:'/static/apps/projectsGeneral/projectsGeneralApp.js',
    signUp:'/static/apps/signUp/signUpApp',
    userProfile:'/static/apps/userProfile/userProfileApp.js',
    viewProject:'/static/apps/viewProject/viewProjectApp.js'
  },
  output:{
    filename:'[name].js',
    path:__dirname + '/static/bundles'
  }
}