var express = require('express');
var router = express.Router();
const auth = require('../middlewares/auth')

let jwt = require('jsonwebtoken');
let passport = require('passport');

let userController = require("../controllers/user");

/* GET users listing. */
router.post('/register', userController.register);

router.post('/login', userController.login);



router.get('/me', passport.authenticate('jwt', {session: false}) ,  userController.me);

module.exports = router;
