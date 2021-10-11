const { setJwtCookie, isAuthorized } = require("./tokenFunctions");

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
        //TODO: 데이터베이스에서 유저정보들 삭제하기
        setJwtCookie(res, req.cookies.jwt, 1);
        res.status(200).json({
          email: accessTokenData.email,
        });
      }
    }
  },
};
