const { jwt } = require("../../config");
const { sign, verify } = require("jsonwebtoken");

module.exports = {
  generateAccessToken: (data) => {
    delete data.dataValues.password;
    return sign(data.dataValues, jwt.secretKey, {
      algorithm: "HS256",
      expiresIn: "2h",
    });
  },
  isAuthorized: (req) => {
    try {
      return verify(req.cookies.jwt, jwt.secretKey);
    } catch (err) {
      return null;
    }
  },
  setJwtCookie: (res, token, clear = 0) => {
    if (clear) {
      res.clearCookie("jwt", token, {
        httpOnly: true,
      });
    } else {
      res.cookie("jwt", token, {
        httpOnly: true,
      });
    }
  },
};
