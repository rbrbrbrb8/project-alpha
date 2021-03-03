const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;



const signUpRouter = require('./routes/signUpRoute');


mongoose.connect('mongodb+srv://rbrbrbrb8:rbpromongorb23@clusterproject.pzpyd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(){
    console.log('were connected');
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
      });
    
});
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static('static'));

app.use('/signup',signUpRouter);

app.get('/', (req, res) => {
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
  


