const express = require("express");
const router = express.Router();
const { habits, isLoggedIn } = require("../controllers");
const { create, findAll, findById, participate } = habits;

router.get("/", findAll);
router.post("/", isLoggedIn, create);
router.get("/:habits_id", isLoggedIn, findById);
router.post("/:habits_id", isLoggedIn, participate);

module.exports = router;
