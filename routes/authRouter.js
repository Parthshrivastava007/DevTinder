const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { signUpValidation } = require("../utlis/validations");

const authRouter = express.Router();

authRouter.post("/signUp", async (req, res, err) => {
  try {
    //Validating the data
    signUpValidation(req);

    //Password validation
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;

    const user = new User(req.body);
    await user.save();
    res.send("User added Sucessfully!!");
  } catch (err) {
    res.status(400).send("User cannot be added " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await user.isValidPassword(password);

    if (isPasswordValid) {
      const token = await user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 7 * 3600000),
      });

      res.send("Login Successful");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

authRouter.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.send("Logout Successful");
});

module.exports = authRouter;
