const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../controllers");

router.get("/", isLoggedIn, () => {});

module.exports = router;
