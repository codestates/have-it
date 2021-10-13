const express = require("express");
const router = express.Router();
const isAuth = require("../middlewares/auth");
const goal = require("../controllers/goal");
const { modifyUserhabitGoal } = goal;
router.put("/", isAuth, modifyUserhabitGoal);

module.exports = router;
