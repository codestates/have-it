const express = require("express");
const multer = require("multer");

const router = express.Router();
const upload = multer({ dest: "../uploads/" });

router.post("/", upload.single("photo"), (req, res) => {
  console.log(req.file);
  res.end();
});

module.exports = router;
