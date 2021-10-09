const express = require("express");
const router = express.Router();
const { posts, isLoggedIn } = require("../controllers");
const { find, create, modify, remove } = posts;

router.get("/:habits_id", isLoggedIn, find);
router.post("/:habits_id", isLoggedIn, create);
router.put("/modification/:post_id", isLoggedIn, modify);
router.delete("/modification/:post_id", isLoggedIn, remove);

module.exports = router;
