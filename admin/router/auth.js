const bcrypt = require('bcryptjs');
const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport-oauth')
const passportHttp = require('passport-http');
const logout = require('express-passport-logout');
const router = express.Router();
const bodyParser = require("body-parser")
require('./connection');
const User = require("../model/userSchema");

router.get('/',(req,res)=>{
    res.render("home")
 });
router.get("/login",function(req,res){
    res.render("login");
});
router.get("/register",(req, res)=>{
    res.render("register");
})
router.post("/register",async(req,res)=>{
  try{
    
    const password = req.body.password;
    const cpassword = req.body.cpassword;

    if(password === cpassword){

        const users = new User({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: password,
            cpassword: cpassword
        })

        const token = await users.generateAuthToken();
        
        const user = await users.save();
        res.status(201).render("home");

    }else{
        res.send("password are not matching");
    }

  }catch(error){
      res.status(400).send(error);
  }
//     const {name, email, username, password, cpassword} = req.body;

//    if(!name || !email || !username || !password || !cpassword ){
//        return res.status(422).json({ error: "plz filled th field properly"});
//    }
//     User.findOne({email: email})
//     .then((userExist)=>{
//         if(userExist){
//             return res.status(422).json({ error: "email already exits"});
//         }
//         const user = new User({name , email, username, password, cpassword})
//         user.save();
//     })
    
});
router.post("/login",async (req,res)=>{
    try{
        const username = req.body.username;
        const password = req.body.password;

        const usernames = await User.findOne({username:username});

        const isMatch = await bcrypt.compare(password, usernames.password);
        const token = await usernames.generateAuthToken();
        console.log("the token part"+ token)

        if(isMatch){
            res.status(201).render("logout");
        }else{
            res.send("Invalid username or password");
        }

    }catch(error){
        res.status(400).send("invalid login ")
    }
});
router.get('/logout', function(req, res){
    logout();
    console.log('logged out');
    res.redirect('/');
  });
// Load hash from your password DB.
// const securePassword = async (password) =>{
//     const passwordHash = await bcrypt.hash(password,  10);
//     console.log(passwordHash);
//     const passwordMatch = await bcrypt.compare(password, passwordHash);
//     console.log(passwordMatch);
// }
// securePassword("anupam123");
module.exports = router;
