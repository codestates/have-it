const config = require("./index");

module.exports = {
  development: {
    username: config.db.username,
    password: config.db.password,
    database: config.db.database,
    host: config.db.host,
    dialect: "mysql",
  },
  test: {
    username: config.db.username,
    password: config.db.password,
    database: config.db.database,
    host: config.db.host,
    dialect: "mysql",
  },
  production: {
    username: config.db.username,
    password: config.db.password,
    database: config.db.database,
    host: config.db.host,
    dialect: "mysql",
  },
};
