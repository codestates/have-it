const { User } = require("../models");
const { DeleteImageinTable, DBERROR } = require("./functions");

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
              nickname: checkNickName.dataValues.nickname,
              bio: bio || userInfo.dataValues.bio,
              image: location || userInfo.dataValues.image,
            },
          });
        } else {
          res.status(201).json({
            message: "Nickname already exists but else other information has been updated.",
            data: {
              usersId: users_id,
              nickname: checkNickName.dataValues.nickname,
              bio: userInfo.dataValues.bio,
              image: location || userInfo.dataValues.image,
            },
          });
        }
      } else {
        res.status(201).json({
          message: "ok",
          data: {
            usersId: users_id,
            nickname: userInfo.dataValues.nickname,
            bio: userInfo.dataValues.bio,
            image: userInfo.dataValues.image,
          },
        });
      }
    } catch (err) {
      DBERROR(res, err);
    }
  },
  removeUserInfo: (req, res) => {
    const { users_id } = req.params;
    const accessTokenData = isAuthorized(req);
    if (!accessTokenData) {
      res.status(404).send("invalid user");
    } else {
      if (accessTokenData.users_id !== users_id) {
        res.status(403).send("don't have permission.");
      } else {
        User.destroy({
          users_id: accessTokenData.users_id,
        }).then((result) => {
          setJwtCookie(res, req.cookies.jwt, 1);
          res.status(200).json({
            users_id: accessTokenData.users_id,
            email: accessTokenData.email,
          });
        });
      }
    }
  },
};
