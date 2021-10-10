const express = require("express");
const router = express.Router();
const { users } = require("../controllers");
const { signin, signout, signup, modify, remove } = users;

router.post("/signin", signin);
router.get("/signout", signout);
router.post("/signup", signup);
router.put("/modification", modify);
router.delete("/modification", remove);

module.exports = router;
