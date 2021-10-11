const bcrypt = require("bcrypt");
const { generateAccessToken, setJwtCookie, isAuthorized } = require("./tokenFunctions");
const { saltRounds } = require("../config");
const { User } = require("../models");

module.exports = {
  isAuth: (req, res) => {
    const accessToken = isAuthorized(req);
    if (!accessToken) {
      res.status(401).send("invalid token");
    } else {
      res.status(200).send("valid token");
    }
  },
  signin: (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(422).send("insufficient parameters supplied");
    } else {
      User.findOne({
        where: {
          email,
        },
      })
        .then((data) => {
          if (!data) {
            res.status(404).send("invalid user");
          } else {
            const same = bcrypt.compareSync(password, data.dataValues.password);
            if (!same) {
              res.status(404).send("invalid user");
            } else {
              // TODO: 유저 정보, 보유 채널, done여부 리턴, 쿠키에 토큰 넣어주기
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  signout: (req, res) => {
    setJwtCookie(res, req.cookies.jwt, 1);
    res.status(205).send("Logged out successfully");
  },
  signup: (req, res) => {
    console.log(req.body);
    const { email, password, users_id } = req.body;

    if (!email || !password || !users_id) {
      res.status(422).send("insufficient parameters supplied");
    } else {
      const hashedPassword = bcrypt.hashSync(password, saltRounds);
      User.create({
        email: email,
        users_id: users_id,
        password: hashedPassword,
        sns: "local",
      })
        .then((result) => {
          const token = generateAccessToken(result);
          setJwtCookie(res, token);
          res.status(201).json({ users_id: result.users_id });
        })
        .catch((err) => {
          console.log(err);
          res.status(409).send("already email or users_id exists");
        });
    }
  },
};
