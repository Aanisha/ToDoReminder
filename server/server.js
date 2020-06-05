const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./Routes/api');
const path = require('path');
const session = require('express-session');
require('dotenv').config();

const app = express();

const port =  process.env.PORT ||5000;

//connect to the database
mongoose.connect( process.env.MONGODB , { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true  })
  .then(() => console.log(`Database connected successfully`))
  .catch(err => console.log(err));

//  mongodb+srv://Aanisha:HelloWorld@cluster0-clksj.azure.mongodb.net/test?retryWrites=true&w=majority
//  mongodb+srv://AzizStark:148635Stark@cluster0-bwssb.gcp.mongodb.net/azizstark?retryWrites=true&w=majority
/*mongoose.connect("mongodb://localhost:27017", { useNewUrlParser: true })
  .then(() => console.log(`Database connected successfully`))
  .catch(err => console.log(err));*/
  

//since mongoose promise is depreciated, we overide it with node's promise
mongoose.Promise = global.Promise;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true,
  maxAge: 5 * 60 * 60 * 1000, // 8 hours
}))

app.use(bodyParser.json());

app.use('/api', routes);


//uncomment below lines in production 

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
// });

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});
