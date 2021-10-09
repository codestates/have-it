const express = require("express");
const router = express.Router();
const { habits, isLoggedIn } = require("../controllers");
const { create, findAll, findById, participate } = habits;

router.get("/", findAll); // 홈 화면 출력 로그인 확인 안해도 됨
router.post("/", isLoggedIn, create);
router.get("/:habits_id", isLoggedIn, findById);
router.post("/:habits_id", isLoggedIn, participate);

module.exports = router;
