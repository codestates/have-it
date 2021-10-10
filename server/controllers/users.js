const { generateAccessToken, sendAccessToken, setCookie } = require("./tokenFunctions");
const { bcrypt } = require("../config");
const { User } = require("../models");
module.exports = {
  modifyUserInfo: (req, res) => {
    res.status(200).send("users modify");
  },
  removeUserInfo: (req, res) => {
    res.status(200).send("users remove");
  },
  signin: (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(422).send("insufficient parameters supplied");
    } else {
      User.findOne({
        where: {
          email,
          password,
        },
      }).then((data) => {
        if (!data) {
          res.status(404).send("invalid user");
        } else {
          // TODO: 유저 정보, 보유 채널, done여부 리턴, 쿠키에 토큰 넣어주기
        }
      });
    }
  },
  signout: (req, res) => {
    setCookie(res, req.cookies.jwt, 1);
    res.status(205).send("Logged out successfully");
  },
  signup: (req, res) => {
    const { email, password, user_id } = req.body;
    if (!email || !password || !user_id) {
      res.status(422).send("insufficient parameters supplied");
    }
  },
};
