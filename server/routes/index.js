var express = require('express');
var router = express.Router();

let passport = require('passport');
let indexController = require("../controllers/index");
let userController = require("../controllers/user");

function reqAuth(req, res, next) 
{
    // check user logged
    if (!req.isAuthenticated()) {
      return res.redirect("/member");
    }
    next();
}

/* GET home page. */
router.get('/', indexController.home );

/* First release listing page */
router.get('/tournment', reqAuth , indexController.tournment );

router.get('/profile', reqAuth , indexController.profile );

//Member with JWT
router.get('/member', indexController.member );

router.get('/logout', userController.logout);

router.get('*', indexController.home );

module.exports = router;
 