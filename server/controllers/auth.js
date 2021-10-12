const bcrypt = require("bcrypt");
const { v4: uuid } = require("uuid");
const { saltRounds } = require("../config");
const { User } = require("../models");
const { generateAccessToken, setCookie, clearCookie } = require("./token");

module.exports = {
  checkNickname: async (req, res) => {
    const { nickname } = req.params;
    const foundUser = await User.findOne({ where: { nickname } });
    if (foundUser) {
      return res.status(409).json({ message: `${nickname} already exists` });
    }
    return res.status(200).json({ message: "Valid nickname" });
  },

  checkEmail: async (req, res) => {
    const { email } = req.params;
    const foundUser = await User.findOne({ where: { email } });
    if (foundUser) {
      const { sns } = foundUser.dataValues;
      return res.status(409).json({ message: `${email} already exists`, sns });
    }
    return res.status(200).json({ message: "Valid email" });
  },

  me: async (req, res) => {
    const foundUser = await User.findOne({
      where: { users_id: req.userId },
      attributes: { exclude: ["password"] },
    });

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // TODO: userhabits와 habits를 join한 결과를 응답

    return res.status(200).json({ message: "Valid user", user: foundUser.dataValues });
  },

  signin: async (req, res) => {
    const { email, password } = req.body;

    const foundUserByEmail = await User.findOne({ where: { email } });
    if (!foundUserByEmail) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const { sns } = foundUserByEmail.dataValues;
    if (sns !== "local") {
      return res.status(409).json({ message: `${email} already exists`, sns });
    }

    const isValidPassword = await bcrypt.compare(password, foundUserByEmail.dataValues.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateAccessToken(foundUserByEmail.dataValues.users_id);

    setCookie(res, token);

    delete foundUserByEmail.dataValues.password;

    // TODO: userhabits와 habits를 join한 결과를 응답

    return res.status(200).json({ message: "Signed in", user: foundUserByEmail.dataValues });
  },

  signout: (req, res) => {
    const { jwt } = req.cookies;
    clearCookie(res, jwt);
    res.status(205).json({ message: "Signed out" });
  },

  signup: async (req, res) => {
    const { nickname, email, password } = req.body;

    const foundUserByNickname = await User.findOne({ where: { nickname } });
    if (foundUserByNickname) {
      return res.status(409).json({ message: `${nickname} already exists` });
    }

    const foundUserByEmail = await User.findOne({ where: { email } });
    if (foundUserByEmail) {
      const { sns } = foundUserByEmail.dataValues;
      return res.status(409).json({ message: `${email} already exists`, sns });
    }

    const hashed = await bcrypt.hash(password, saltRounds);

    const createdUser = await User.create({
      users_id: uuid(),
      nickname,
      email,
      password: hashed,
      sns: "local",
    });
    const foundUser = await User.findOne({
      where: { users_id: createdUser.dataValues.users_id },
      attributes: { exclude: ["password", "bio", "image", "sns", "createdAt", "updatedAt"] },
    });
    const token = generateAccessToken(foundUser.dataValues.users_id);

    setCookie(res, token);

    return res.status(201).json({ message: "Signed up", user: foundUser.dataValues });
  },
};
