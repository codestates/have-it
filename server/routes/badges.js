const express = require("express");
const router = express.Router();
const { getUserLevel } = require("../controllers/badges");
const isAuth = require("../middlewares/auth");

router.get("/", isAuth, getUserLevel);

module.exports = router;
