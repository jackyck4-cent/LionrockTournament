var express = require('express');
var router = express.Router();

let tournmentController = require("../controllers/tournment2");

router.get("/", tournmentController.list);
router.get("/players", tournmentController.playerlist);
router.get("/fulllist", tournmentController.fulllist);

router.get("/:id", tournmentController.get);
router.post("/", tournmentController.add);
router.put("/:id", tournmentController.edit);
router.delete("/:id", tournmentController.delete);

module.exports = router;
