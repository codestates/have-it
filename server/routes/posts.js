const express = require("express");
const router = express.Router();
const posts = require("../controllers/posts");
const { findPosts, writePost, modifyPost, removePost } = posts;
const isAuth = require("../middlewares/auth");

router.get("/:habits_id", isAuth, findPosts);
router.post("/:habits_id", isAuth, writePost);
router.put("/:posts_id", isAuth, modifyPost);
router.delete("/:posts_id", isAuth, removePost);

module.exports = router;
