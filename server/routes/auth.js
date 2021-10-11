const express = require("express");
const auth = require("../controllers/auth");
const router = express.Router();
const { signin, signout, signup, isAuth } = auth;

router.post("/signin", signin);
router.get("/signout", signout);
router.post("/signup", signup);
router.get("/", isAuth);

module.exports = router;
