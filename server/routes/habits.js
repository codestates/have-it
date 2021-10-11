const express = require("express");
const router = express.Router();
const habits = require("../controllers/habits");
const { createHabit, findHabits, findHabitById, joinHabit } = habits;

router.get("/", findHabits);
router.post("/", createHabit);
router.get("/:habits_id", findHabitById);
router.post("/:habits_id", joinHabit);

module.exports = router;
