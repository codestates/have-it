const { jwt } = require("../../config");
const { sign, verify } = require("jsonwebtoken");

module.exports = {
  generateAccessToken: (data) => {
    return sign(data.dataValues, jwt.secretKey, {
      algorithm: "HS256",
      expiresIn: "3h",
    });
  },
  sendAccessToken: (res, accessToken) => {
    res.cookie("jwt", accessToken, {
      httpOnly: true,
    });
  },
  isAuthorized: (req) => {
    try {
      return verify(req.cookies.jwt, jwt.secretKey);
    } catch (err) {
      return null;
    }
  },
};
