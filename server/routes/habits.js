const express = require("express");
const router = express.Router();
const habits = require("../controllers/habits");
const isAuth = require("../middlewares/auth");
const { createHabit, findHabits, findHabitById, joinHabit, getTitle } = habits;

router.get("/", isAuth, findHabits);
router.post("/", isAuth, createHabit);
router.get("/:habits_id", isAuth, findHabitById);
router.post("/:habits_id", isAuth, joinHabit);
router.get("/title/:habits_id", isAuth, getTitle);

module.exports = router;
