var express = require('express');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
var router = express.Router();
let mongoose = require("mongoose");

let passport = require('passport');
let userModel = require("../models/user");
let User = userModel.User
let DB = require("../config/db")

module.exports.register = function(req, res, next) {

  const user = new User({
    username: req.body.username,
    display_name : req.body.displayname,
    email: req.body.email,
  //  password: hash,
  })

  if (user.username != "" && user.display_name != "" && user.email != "" )
  {
    User.register(user, req.body.password, (err) => {
      if(err)
      {
        console.log(err)
        return res.json({status: 2, msg: 'User already exist'});
      }
      else
      {
        return res.json({status: 1, msg: 'User Registered Successfully!'});
      }
    });
      
  }
  else
  {
    return res.json({status: 3, msg: 'Invalid Input'});
  }

  
}

module.exports.logout = function(req, res, next) {
  req.logOut(
    function(req)
    {
      res.redirect('/member');
    }
  );

  
}


module.exports.login = function(req, res, next) {

  passport.authenticate('local',
    (err, user, info) => {
        
      //console.log(req.body);
      if(err)
      {
          return next(err);
      }
      
      if(!user)
      {
        return res.json({status : 2 , success: true })
      }
      req.login(user, (err) => {
      
        if(err)
        {
          return next(err);
        }

            const payload = 
            {
              username: user.username,
              display_name: user.display_name,
              email: user.email,
              userId: user._id,
            }

            const authToken = jwt.sign(payload, DB.Secret, {
                expiresIn: 604800 // 1 week
            });
            
            return res.json({status : 1 , success: true, msg: 'User Logged in Successfully!', user: {
                id: user._id,
                displayName: user.displayName,
                username: user.username,
                email: user.email
            }, token: authToken});

           
        });
    })(req, res, next);
    
}


module.exports.me = function(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];

    //console.log(token);
    let userinfo = jwt.verify(token, DB.Secret );

    return res.status(200).json({
        status : 1,
       
        info : userinfo
      })
}