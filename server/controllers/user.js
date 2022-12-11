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

  User.estimatedDocumentCount().then( (count) =>  {
      
      strCOunt = (count+1)+"";
      for (var a=strCOunt.length;a<4;a++)
        strCOunt = "0"+strCOunt;
      strRefer = "a"+strCOunt;
      console.log('Count is ' + strRefer);

      const user = new User({
        username: req.body.username,
        display_name : req.body.display_name,
        email: req.body.email,
        reference : strRefer,
        role : 'user'
      //  password: hash,
      })
    
      console.log(user);
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
    });


  

  
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
              user_id: user.reference,
              role: user.role,
            }

            const authToken = jwt.sign(payload, DB.Secret, {
                expiresIn: 604800 // 1 week
            });
            
            return res.json({status : 1 , success: true, msg: 'User Logged in Successfully!', user: {
                id: user._id,
                display_name: user.display_name,
                username: user.username,
                email: user.email,
                user_id: user.reference,
              role: user.role,
            }, token: authToken});

           
        });
    })(req, res, next);
    
}


module.exports.me = function(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];

    //console.log(token);
    let userinfo = jwt.verify(token, DB.Secret );

    User.find({
      'reference' : userinfo.user_id
  } ).then( ( items ) => {

    userinfo = {}
    if (items.length > 0 )
    {
      userinfo = {
        "username":items[0].username,
        "display_name":items[0].display_name,
        "email":items[0].email,
        "userId":items[0]._id,
        "user_id":items[0].reference,
        "role":items[0].role
        
      };
    }

    return res.status(200).json({
      status : 1,
      
      info : userinfo
    })
  })

    
}

module.exports.change = function(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];

  //console.log(token);
  let userinfo = jwt.verify(token, DB.Secret );

  User.find({
      'reference' : userinfo.user_id
  } ).then( ( items ) => {
    
   
    if ( items.length > 0 )
    {

      let entry = items[0];
      entry.display_name = req.body.display_name
      entry.email = req.body.email;
      entry.save();

      return res.status(200).json({
        status : 1,
      
        info : entry
      })
    }
  })

 
}
