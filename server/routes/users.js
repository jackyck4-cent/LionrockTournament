var express = require('express');
var router = express.Router();
const auth = require('../middlewares/auth')

let userController = require("../controllers/user");

/* GET users listing. */
router.post('/register', userController.register);

router.post('/login', userController.login);

router.get('/me', auth ,  userController.me);

module.exports = router;
