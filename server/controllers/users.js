const { User } = require("../models");
const { DeleteImageinTable, DBERROR } = require("./functions");
const { clearCookie } = require("./token");

module.exports = {
  modifyUserInfo: async (req, res) => {
    const { bio, nickname } = req.body;
    const { users_id } = req.params;

    let location;
    if (req.file) {
      location = req.file.location;
    }
    try {
      const userInfo = await User.findOne({ where: { users_id } });
      const { image } = userInfo.dataValues;
      if (image && location) {
        DeleteImageinTable(image);
      }
      await userInfo.update({ bio, image: location });
      if (nickname) {
        const checkNickName = await User.findOne({ where: { nickname } });
        if (!checkNickName) {
          await userInfo.update({ nickname });
          res.status(201).json({
            message: "ok",
            data: {
              usersId: users_id,
              nickname: userInfo.dataValues.nickname,
              image: location || userInfo.dataValues.image,
              bio: userInfo.dataValues.bio,
            },
          });
        } else {
          res.status(201).json({
            message: "Nickname already exists but else other information has been updated.",
            data: {
              usersId: users_id,
              nickname: userInfo.dataValues.nickname,
              image: location || userInfo.dataValues.image,
              bio: userInfo.dataValues.bio,
            },
          });
        }
      } else {
        res.status(201).json({
          message: "ok",
          data: {
            usersId: users_id,
            nickname: userInfo.dataValues.nickname,
            image: location || userInfo.dataValues.image,
            bio: userInfo.dataValues.bio,
          },
        });
      }
    } catch (err) {
      DBERROR(res, err);
    }
  },

  removeUserInfo: async (req, res) => {
    const {
      params: { users_id },
      token,
    } = req;

    const foundUser = await User.findOne({
      where: { users_id },
    });

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    await foundUser.destroy();
    clearCookie(res, token);
    return res.status(200).json({ message: "User deleted", data: { usersId: users_id } });
  },
};
