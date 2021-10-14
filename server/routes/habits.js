const express = require("express");
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const {
  createHabit,
  findHabits,
  findHabitById,
  joinHabit,
  getTitle,
  modifyHabit,
} = require("../controllers/habits");
const isAuth = require("../middlewares/auth");

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

router.get("/", findHabits);
router.post("/", isAuth, createHabit);
router.get("/:habits_id", isAuth, findHabitById);
router.post("/:habits_id", isAuth, joinHabit);
router.put("/:habits_id", isAuth, upload.single("image"), modifyHabit); // TODO : 데이터 타입 정해지면 하기
router.get("/title/:habits_id", isAuth, getTitle);
module.exports = router;
