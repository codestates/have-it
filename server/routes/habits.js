const express = require("express");
const router = express.Router();
const { habits } = require("../controllers");
const { create, findAll, findById, participate } = habits;

router.get("/", findAll);
router.post("/", create);
router.get("/:habits_id", findById);
router.post("/:habits_id", participate);

module.exports = router;
