const express = require("express");
const router = express.Router();
const posts = require("../controllers/posts");
const { writePost, modifyPost, removePost } = posts;
const isAuth = require("../middlewares/auth");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/:habits_id", isAuth, upload.single("image"), writePost);
router.put("/:posts_id", isAuth, upload.single("image"), modifyPost);
router.delete("/:posts_id", isAuth, removePost);

module.exports = router;
