const express = require("express");
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const isAuth = require("../middlewares/auth");
const { modifyUserInfo, removeUserInfo } = require("../controllers/users");

const router = express.Router();

aws.config.loadFromPath("./awsconfig.json");
const s3 = new aws.S3();
const upload = multer({
  storage: multerS3({
    s3,
    bucket: "haveit",
    metadata(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key(req, file, cb) {
      const extension = file.mimetype.split("/")[1];
      cb(null, `${Date.now()}.${extension}`);
    },
    ACL: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
  }),
});

router.put("/:users_id", isAuth, upload.single("image"), modifyUserInfo);
router.delete("/:users_id", isAuth, removeUserInfo);

module.exports = router;
