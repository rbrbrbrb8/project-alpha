const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const MongoStore = require('connect-mongo').default;
const app = express();
const port = 3000;

const sessionStore = MongoStore.create({
  mongoUrl:'mongodb+srv://rbrbrbrb8:rbpromongorb23@clusterproject.pzpyd.mongodb.net/ProjectDatabase?retryWrites=true&w=majority',
  collectionName:'Sessions'
});

const signUpRouter = require('./routes/signUpRoute');


mongoose.connect('mongodb+srv://rbrbrbrb8:rbpromongorb23@clusterproject.pzpyd.mongodb.net/ProjectDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(){
    console.log('were connected');
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
      });
    
});

//init parsers
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//setting up session
app.use(session({
  secret:'some secret',
  resave:false,
  saveUninitialized:true,
  store:sessionStore,
  cookie:{
    maxAge:1000*60*60*24
  }
}));

app.use(express.static('static'));

//using routers
app.use('/signup',signUpRouter);


//needs changing to loginRouter
app.get('/', (req, res) => {
  if(req.session.viewCount){
    req.session.viewCount++;
  } else{
    req.session.viewCount = 1;
  }
  console.log(`you have visited this page ${req.session.viewCount} times`);
  res.sendFile('/pages/index.html',{root:__dirname});
});

// app.get('/signup', (req, res) => {
//   // res.send("omer tipa gay");
//     res.sendFile('/pages/signup.html',{root:__dirname});
//   })

// app.use('/signup', (req, res) => {
//   res.send("omer tipa gay");
//     // res.sendFile('/pages/signup.html',{root:__dirname});
//   })
  


