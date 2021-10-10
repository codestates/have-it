const express = require("express");
const router = express.Router();
const users = require("../controllers/users");
const { signin, signout, signup, modifyUserInfo, removeUserInfo } = users;

router.post("/signin", signin);
router.get("/signout", signout);
router.post("/signup", signup);
router.put("/:users_id", modifyUserInfo);
router.delete("/:users_id", removeUserInfo);

module.exports = router;
