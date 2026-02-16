const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("../config/db");

const authRouter = require("../routes/authRouter");
const profileRouter = require("../routes/profileRouter");
const requestRouter = require("../routes/requestRouter");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

connectDB()
  .then(() => {
    console.log("Database Connected Successfully");
    app.listen(3000, () => {
      console.log("Server successfully created on port Number 3000");
    });
  })
  .catch(() => {
    console.log("Database cannot connected successfully");
  });
