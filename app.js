const express = require('express');
const mongoose = require("mongoose")
const signupRoute = require('./api/routes/signup');
const loginRoute = require('./api/routes/login')
const authRoute = require('./api/routes/auth');
const subjectRoute = require('./api/routes/subject')
const lessonRoute = require('./api/routes/lesson')
const userRoute = require('./api/routes/user')


var app = express();

mongoose
  .connect(
    ,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(result => {
    console.log("Database connected");
    app.listen(3000);
  })
  .catch(err => console.log(err));





  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

app.use('/', authRoute)
app.use('/login', loginRoute)
app.use('/signup',signupRoute)
app.use('/subject',subjectRoute)
app.use('/lesson',lessonRoute)


 

