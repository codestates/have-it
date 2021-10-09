module.exports = {
  isLoggedIn: require("./isLoggedIn"),
  users: {
    signin: require("./users/signin"),
    signout: require("./users/signout"),
    signup: require("./users/signup"),
    modify: require("./users/modify"),
    remove: require("./users/remove"),
  },
  habits: {
    create: require("./habits/create"),
    findAll: require("./habits/findAll"),
    findById: require("./habits/findById"),
    participate: require("./habits/participate"),
  },
  posts: {
    find: require("./posts/find"),
    cretae: require("./posts/create"),
    modify: require("./posts/modify"),
    delete: require("./posts/remove"),
  },
};
