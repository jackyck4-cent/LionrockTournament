var express = require('express');
var router = express.Router();
let mongoose = require("mongoose");

module.exports.home = function(req, res, next) {
    res.render('index', { title: 'Home' , loguser : req.user  });
}

module.exports.tournment = function(req, res, next) {
    res.render('tournment/dashboard', { title: 'Tournment listing' , loguser : req.user  });
}

module.exports.member = function(req, res, next) {
//    console.log("??");
//    console.log(req.user )
    res.render('member/main', { title: 'Member' , loguser : req.user  });
}

module.exports.profile = function(req, res, next) {
    //    console.log("??");
    //    console.log(req.user )
    res.render('member/profile', { title: 'Profile' , loguser : req.user  });
}
