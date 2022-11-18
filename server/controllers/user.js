var express = require('express');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
var router = express.Router();
let mongoose = require("mongoose");

let User = require("../models/user");


module.exports.register = function(req, res, next) {

    bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new User({
            username: req.body.username,
            display_name : req.body.displayname,
            email: req.body.email,
            password: hash,
        })
        user
          .save()
          .then((response) => {
            res.json({ status: 1 , 'message' : 'OK' });
          })
          .catch((error) => {
            res.status(500).json({
                status: 0 , 'message' : 'Error'
            })
          })
      })
}

module.exports.login = function(req, res, next) {
    
    let loggeduser 

    User.findOne({
        username: req.body.username,
    }).then((user) => {
      if (!user) {
        return res.status(200).json({
            status : 2,
          message: 'Authentication failed',
        })
      }
      loggeduser = user
      return bcrypt.compare(req.body.password, user.password)
    }).then((response) => {
      if (!response) {
        return res.status(200).json({
            status : 2,
          message: 'Authentication failed',
        })
      }
      let jwtToken = jwt.sign(
        {
            username: loggeduser.username,
            display_name: loggeduser.display_name,
            email: loggeduser.email,
            userId: loggeduser._id,
        },
        DB.Secret,
        {
          expiresIn: '1h',
        },
      )
      return res.status(200).json({
        status : 1,
        token: jwtToken,
        expiresIn: 3600,
        _id: loggeduser._id,
      })
    })
    .catch((err) => {
      return res.status(200).json({
        status : 2,
        message: 'Authentication failed',
      })
    })
}


module.exports.me = function(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    let userinfo = jwt.verify(token, DB.Secret );

    return res.status(200).json({
        status : 1,
       
        info : userinfo
      })
}