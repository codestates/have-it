const express = require("express");
const router = express.Router();
const { users, isLoggedIn } = require("../controllers");

const { signin, signout, signup, modify, remove } = users;

router.post("/signin", signin);
router.get("/signout", isLoggedIn, signout);
router.post("/signup", signup);
router.put("/modification", isLoggedIn, modify);
router.delete("/modification", isLoggedIn, remove);

module.exports = router;
