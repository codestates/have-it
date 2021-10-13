const express = require("express");
const router = express.Router();
const habits = require("../controllers/habits");
const isAuth = require("../middlewares/auth");
const { createHabit, findHabits, findHabitById, joinHabit, getTitle, modifyHabit } = habits;

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

router.get("/", isAuth, findHabits);
router.post("/", isAuth, createHabit);
router.get("/:habits_id", isAuth, findHabitById);
router.post("/:habits_id", isAuth, joinHabit);
router.put("/:habits_id", isAuth, upload.single("image"), modifyHabit); //TODO : 데이터 타입 정해지면 하기
router.get("/title/:habits_id", isAuth, getTitle);
module.exports = router;
