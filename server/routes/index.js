var express = require('express');
var router = express.Router();

let indexController = require("../controllers/index");

/* GET home page. */
router.get('/', indexController.home );

/* First release listing page */
router.get('/tournment', indexController.tournment );

//Member with JWT
router.get('/member', indexController.member );

module.exports = router;
