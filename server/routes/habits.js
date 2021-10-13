const express = require("express");
const router = express.Router();
const habits = require("../controllers/habits");
const isAuth = require("../middlewares/auth");
const { createHabit, findHabits, findHabitById, joinHabit, getTitle, modifyHabit } = habits;
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", isAuth, findHabits);
router.post("/", isAuth, createHabit);
router.get("/:habits_id", isAuth, findHabitById);
router.post("/:habits_id", isAuth, joinHabit);
router.put("/:habits_id", isAuth, upload.single("image"), modifyHabit); //TODO : 데이터 타입 정해지면 하기
router.get("/title/:habits_id", isAuth, getTitle);
module.exports = router;
