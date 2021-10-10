module.exports = {
  isAuthorized: require("./tokenFunctions").isAuthorized,
  users: require("./users"),
  habits: require("./habits"),
  posts: require("./posts"),
  auth: require("./auth"),
};
