const { isAuthorized } = require("./tokenFunctions");

module.exports = (req, res) => {
  const accessToken = isAuthorized(req);
  if (!accessToken) {
    res.status(401).send("invalid user");
  } else {
    res.status(200).send("valid user");
  }
};
