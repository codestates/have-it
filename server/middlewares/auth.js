const { verifyAccessToken } = require("../controllers/token");
const { User } = require("../models");

const AUTH_ERROR = { message: "Authentication Error" };

const isAuth = async (req, res, next) => {
  const accessToken = req.cookies.jwt;
  if (!accessToken) {
    return res.status(401).json(AUTH_ERROR);
  }

  const decoded = verifyAccessToken(accessToken);
  if (!decoded) {
    return res.status(401).json(AUTH_ERROR);
  }

  const foundUser = await User.findOne({ where: { users_id: decoded.id } });
  if (!foundUser) {
    return res.status(401).json(AUTH_ERROR);
  }

  req.userId = foundUser.dataValues.users_id;
  req.token = accessToken;
  return next();
};

module.exports = isAuth;
