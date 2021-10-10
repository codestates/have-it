const express = require("express");
const router = express.Router();
const { posts } = require("../controllers");
const { find, create, modify, remove } = posts;

router.get("/:habits_id", find);
router.post("/:habits_id", create);
router.put("/modification/:post_id", modify);
router.delete("/modification/:post_id", remove);

module.exports = router;
