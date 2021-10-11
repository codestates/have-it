const express = require("express");
const router = express.Router();
const users = require("../controllers/users");
const { modifyUserInfo, removeUserInfo } = users;

router.put("/:users_id", modifyUserInfo);
router.delete("/:users_id", removeUserInfo);

module.exports = router;
