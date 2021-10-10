const express = require("express");
const { auth } = require("../controllers");
const router = express.Router();

router.get("/", auth);

module.exports = router;
