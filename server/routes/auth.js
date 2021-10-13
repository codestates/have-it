const express = require("express");
const {
  checkNickname,
  checkEmail,
  signin,
  signout,
  signup,
  me,
  getNaver,
  getGoogle,
} = require("../controllers/auth");
const isAuth = require("../middlewares/auth");

const router = express.Router();

// TODO: express-validator로 validate 추가

router.get("/nickname/:nickname", checkNickname);
router.get("/email/:email", checkEmail);
router.get("/nickname", (req, res) => {
  res.end();
});
router.get("/email", (req, res) => {
  res.end();
});
router.post("/signin", signin);
router.get("/signout", signout);
router.post("/signup", signup);
router.get("/me", isAuth, me);
router.post("/naver", getNaver);
router.post("/google", getGoogle);

module.exports = router;
