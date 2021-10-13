const express = require("express");
const router = express.Router();
const users = require("../controllers/users");
const { modifyUserInfo, removeUserInfo } = users;

const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
aws.config.loadFromPath("./awsconfig.json");
const s3 = new aws.S3();
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "haveit",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      let extension = file.mimetype.split("/")[1];
      cb(null, `${Date.now()}.${extension}`);
    },
    ACL: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
  }),
});

router.put("/:users_id", upload.single("image"), modifyUserInfo);
router.delete("/:users_id", removeUserInfo);

module.exports = router;
