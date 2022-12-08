var express = require('express');
var router = express.Router();

let jwt = require('jsonwebtoken');
let passport = require('passport');

let tournmentController = require("../controllers/tournment2");

router.get("/", tournmentController.list);
router.get("/players", tournmentController.playerlist);
router.get("/fulllist", tournmentController.fulllist);
router.get("/info/:tnid"  , tournmentController.info);
router.post("/create", passport.authenticate('jwt', {session: false}) , tournmentController.create);
router.post("/update/:tnid", passport.authenticate('jwt', {session: false}) , tournmentController.update);

router.get("/register/:tnid", passport.authenticate('jwt', {session: false}) , tournmentController.register);
router.get("/enroll/:tnid", passport.authenticate('jwt', {session: false}) , tournmentController.enroll);
router.get("/start/:tnid", passport.authenticate('jwt', {session: false}) , tournmentController.start);
router.post("/winner/:tnid", passport.authenticate('jwt', {session: false}) , tournmentController.winner);
router.get("/nextround/:tnid", passport.authenticate('jwt', {session: false}) , tournmentController.nextround);
/*
router.get("/:id", tournmentController.get);
router.post("/", tournmentController.add);
router.put("/:id", tournmentController.edit);
router.delete("/:id", tournmentController.delete);
*/
module.exports = router;
