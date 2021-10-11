const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const { sequelize } = require("./models");
const config = require("./config");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/auth");
const habitsRouter = require("./routes/habits");
const postsRouter = require("./routes/posts");
const usersRouter = require("./routes/users");

const app = express();
app.use(helmet());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Let's have it!");
});

app.use("/auth", authRouter);
app.use("/habits", habitsRouter);
app.use("/posts", postsRouter);
app.use("/users", usersRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(400).send("뭔가 착각이 있어요");
});

app.listen(config.port, async () => {
  console.log(`🚀 Listening on PORT: ${config.port}`);
  try {
    await sequelize.authenticate();
    // await sequelize.sync({ force: true });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
