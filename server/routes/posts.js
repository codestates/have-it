const express = require("express");
const router = express.Router();
const posts = require("../controllers/posts");
const { findPost, writePost, modifyPost, removePost } = posts;

router.get("/:habits_id", findPost);
router.post("/:habits_id", writePost);
router.put("/:post_id", modifyPost);
router.delete("/:post_id", removePost);

module.exports = router;
