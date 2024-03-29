if (process.env.NODE_ENV !== 'prod') {
  require('dotenv').config();
}


const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
const logger = require('./handlers/logger/loggerHandler');
// const cookieParser = require('cookie-parser'); //see stack overflow for this

const MongoStore = require('connect-mongo').default;
const app = express();
const port = 3000;

const passport = require('passport');

const initializePassport = require('./passport-config');

app.use(flash());
// const sessionStore = MongoStore.create({
//   mongoUrl:'mongodb+srv://rbrbrbrb8:rbpromongorb23@clusterproject.pzpyd.mongodb.net/ProjectDatabase?retryWrites=true&w=majority',
//   collectionName:'Sessions'
// });


const signUpRouter = require('./routes/signUpRoute');
const loginRouter = require('./routes/loginRouter');
const homepageRouter = require('./routes/homepageRoute');
const addProjectRouter = require('./routes/addProjectRoute');
const projectApiRouter = require('./routes/api/projectApi');
const allProjectsApiRouter = require('./routes/api/allProjectsApi');
const userProfileRouter = require('./routes/userProfileRoute');
const viewProjectRouter = require('./routes/viewProjectRoute');
const userInfoApiRouter = require('./routes/api/userInfoApi');
const imageApiRouter = require('./routes/api/image');
const cacheService = require('./services/cache/cacheService');


cacheService.initCache();


app.listen(port, () => {
  logger.warn(`started app server at http://localhost:${port}`);
});




app.use(express.static('static'));
//init parsers
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({ limit:'50mb',extended: false}));

//setting up session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());



//using routers
app.use('/signup', signUpRouter);
app.post('/',
  passport.authenticate('local', {
    successRedirect: '/homepage',
    failureRedirect: '/',
    failureFlash: true
  }),
  loginRouter);
app.get('/', loginRouter);
app.use('/homepage',checkAuthenticated,homepageRouter);  ///ADD CHECK AUTHENTICATED
app.use('/api/project',  projectApiRouter);
app.use('/api/allprojects', allProjectsApiRouter);
app.use('/addproject', addProjectRouter);
app.use('/userProfile', userProfileRouter);
app.use('/viewProject', viewProjectRouter);
app.use('/api/userInfo',userInfoApiRouter);
app.use('/api/image',imageApiRouter);

function checkAuthenticated(req, res, next) {
  console.log("auth: " + req.isAuthenticated());
  if (req.isAuthenticated()) {
    return next();
  };
  res.redirect('/');
}
