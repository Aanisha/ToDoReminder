const express = require ('express');
const router = express.Router();
const Todo = require('../models/todo');
const Login = require('../models/login');

router.get('/login', (req, res, next) => {

  //this will return all the data, exposing only the id and action field to the client
  var userName=req.body.userName;
  var password=req.body.password;

  Login.findOne({userName:userName,password:password},function(err,user){

    if(err)
    {
      return res.status(500).send();

  }
  if(!user)
  {
      res.json({
      error: "Incorrect userName or password dosen't exist"
    })


  }
  else
  {
      
        /*Todo.find({userName:userName},function(err,user)
        {

               if(err)
               {
                     return res.status(500).send();

               }
               else
               {
                   res.send(user);
               }
        });*/

        res.json({
                isLoggedin: true,
                id:user.id,
                userName:user.userName
          })
  }
         

});

});

router.post('/signin', (req, res, next) => {
  if(req.body){
    Login.create(req.body)
      .then(data => res.json(data))
      .catch(next)
  }else {
    res.json({
      error: "input fields is empty"
    })
  }
});

router.get('/loggedin', (req, res, next) => {

  //this will return all the data, exposing only the id and action field to the client
  Login.find({})
    .then(data => res.json(data))
    .catch(next)
});

router.get('/todos/:user', (req, res, next) => {

  //this will return all the data, exposing only the id and action field to the client
  /*Todo.find({})
    .then(data => res.json(data))
    .catch(next)*/

    Todo.find({"userName": req.params.user})
    .then(data => res.json(data))
    .catch(next)
});

router.post('/todos/:user', (req, res, next) => {
  if(req.body.action && req.body.date && req.body.label)
  {
  var data={

      userName:req.params.user,
      action:req.body.action,
      date:req.body.date,
      label:req.body.label
  }
  
    Todo.create(data)
      .then(data => res.json(data))
      .catch(next)
  }else {
    res.json({
      error: "The input field is empty"
    })
  }
});
  

router.delete('/todos/:id', (req, res, next) => {
  Todo.findOneAndDelete({"_id": req.params.id})
    .then(data => res.json(data))
    .catch(next)
});

module.exports = router;
