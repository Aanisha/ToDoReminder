const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for todo
const LoginSchema = new Schema({
  userName:{
  	type:String,
    required: [true, 'Enter UserName']
    },
  email:{
    type:String,
    required: [true, 'Enter UserName']
   },
  password:{
    type:String,
    required:[true,'Enter password']
  }
})

//create model for todo
const user = mongoose.model('user', LoginSchema);

module.exports = user;
