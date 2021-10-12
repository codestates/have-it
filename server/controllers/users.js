const { User } = require("../models");

module.exports = {
  modifyUserInfo: (req, res) => {
    //TODO: 폼데이터 처리 확인
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
