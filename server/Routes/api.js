const express = require('express');
const crypto = require ('crypto');
const router = express.Router();
const Todo = require('../Models/todo');
const Login = require('../Models/login');
const Users = require('../Models/users');

router.get('/login2', (req, res, next) => {

  //this will return all the data, exposing only the id and action field to the client
  var userName=req.body.userName;
  var password=req.body.password;

  Login.findOne({userName:userName, password:password},function(err,user){

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
  if (req.body.action && req.body.date && req.body.label)
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







//Authentication Function to secure APIs
const requireAuth = (req, res, next) => {
  if (req.session.isLogged === true) {
      next();
  } else {
      return false
  }
};

//For client to check if logged or not
router.get('/isLogged', (req, res, next) => {
  if(req.session.isLogged === true){
    res.status(200).json({data: "Logged"})
  }
  else{
    res.status(401).json({data: "Error"})
  }
})

//login to create a session
router.post('/login',(req,res,next) => {
  const header = Buffer.from(req.headers.authorization.split(" ")[1], 'base64').toString()
  const index = header.lastIndexOf(':')
  const email = header.slice(0,index)
  const pass = header.slice(index + 1)

  console.log(header)

  Users.findOne({ email: email })
    .then(data => {
      if (data !== null){
        var hashed = crypto.pbkdf2Sync(pass, process.env.SALT , 1000, 64, 'sha256').toString('hex');
        if (hashed === data.password) {
          req.session.isLogged = true;
          res.send("Login Successful");
          //authenticated 
        }
        else {
          res.status(401).json({ message: "Password Incorrect" })
        }
      }
      else {
        res.status(404).json({ message: "Account not found" })
      }
        console.log(data)
    })
    .catch(err => console.log(err))

  // if(hashed === process.env.GOLD_BOX && user === process.env.ADMIN){
  //   req.session.isLogged = true;
  //   res.send("Logged In");
  // }
  // else{
  //   res.send("Incorrect credentials")
  // }
})

//for new user to sign up
router.post('/signup', (req, res, next) => {
  const header = Buffer.from(req.headers.authorization.split(" ")[1], 'base64').toString()
  const index = header.lastIndexOf(':')
  const user = header.slice(0,index)
  const pass = header.slice(index + 1)

  hash = crypto.pbkdf2Sync(pass , process.env.SALT , 1000, 64, 'sha256').toString('hex');
  console.log(hash, pass, header, req.body)

  Users.findOne({ email: req.body.email })
    .then(data => {
      if (data == null) {
        Users.create({
          "userName": user,
          "email": req.body.email,
          "password": hash,
        })
          .then(data => {
            req.session.isLogged = true;
            res.json(data)
          })
          .catch(err => console.log(err))
      }
      else {
        res.status(309).json({
          message: "Already exists"
        })
      }
    })
    .catch(err => {
      console.log(err)
    })
    // var hashed = crypto.pbkdf2Sync(pass, process.env.GOLD_KEY, 1000, 64, 'sha256').toString('hex');
})

module.exports = router;
