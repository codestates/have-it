require("express-async-errors");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const { sequelize } = require("./models");
const {
  port,
  cors: { allowedOrigin },
} = require("./config");

const authRouter = require("./routes/auth");
const habitsRouter = require("./routes/habits");
const postsRouter = require("./routes/posts");
const usersRouter = require("./routes/users");
const categoriesRouter = require("./routes/categories");
const goalRouter = require("./routes/goal");
const testRouter = require("./routes/test");

const app = express();

const corsOption = { origin: allowedOrigin, optionsSuccessStatus: 200, credentials: true };
app.use(cors(corsOption));
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
app.use("/categories", categoriesRouter);
app.use("/goal", goalRouter);

app.use("/test", testRouter);

app.use((err, req, res, next) => {
  res.status(500).json({ message: `Something went wrong: ${err}` });
});

app.listen(port, async () => {
  console.log(`🚀 Listening on PORT: ${port}`);
  try {
    await sequelize.authenticate();
    // await sequelize.sync({ force: true });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
