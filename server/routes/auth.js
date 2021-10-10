const express = require("express");
const auth = require("../controllers/auth");
const router = express.Router();

router.get("/", auth);

module.exports = router;
