const express = require("express");
const router = express.Router();
const users = require("../controllers/users");
const { signin, signout, signup, modifyUserInfo, removeUserInfo } = users;

router.post("/signin", signin);
router.get("/signout", signout);
router.post("/signup", signup);
router.put("/modification", modifyUserInfo);
router.delete("/modification", removeUserInfo);

module.exports = router;
