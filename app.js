if(process.env.NODE_ENV !== 'prod'){
   require('dotenv').config();
}


const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');

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

mongoose.connect('mongodb+srv://rbrbrbrb8:rbpromongorb23@clusterproject.pzpyd.mongodb.net/ProjectDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(){
    console.log('were connected');
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
      });
    
});

//init parsers
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//setting up session
app.use(session({
  secret:process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized:false,  
}));

initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('static'));

//using routers
app.use('/signup',signUpRouter);
app.post('/',
  passport.authenticate('local', {
    successRedirect: '/homepage',
    failureRedirect: '/',
    failureFlash: true
  }),
  loginRouter);
app.get('/',loginRouter);
app.use('/homepage',checkAuthenticated,homepageRouter);


// app.get('/signup', (req, res) => {
//   // res.send("omer tipa gay");
//     res.sendFile('/pages/signup.html',{root:__dirname});
//   })

// app.use('/signup', (req, res) => {
//   res.send("omer tipa gay");
//     // res.sendFile('/pages/signup.html',{root:__dirname});
//   })
  
app.get('/addproject',(req,res)=>{
  res.sendFile('/pages/addProject.html',{root:__dirname});
});

function checkAuthenticated(req,res,next){
  console.log("auth: " + req.isAuthenticated());
  if(req.isAuthenticated()){
    return next();
  };
  res.redirect('/');
}
