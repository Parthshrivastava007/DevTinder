const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "FirstName is required"],
      min: 4,
      max: 50,
    },
    lastName: {
      type: String,
      min: 4,
      max: 50,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
    },
    emailId: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      // validate(value) {
      //   if (!validator.isEmail(value)) {
      //     throw new Error("Emaild Id is not valid");
      //   }
      // },
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender is invalid");
        }
      },
    },
    about: {
      type: String,
      default: "This is default about",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true },
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "P@rth123", {
    expiresIn: "7d",
  });

  return token;
};

userSchema.methods.isValidPassword = async function (passwordInputByUser) {
  const user = this;
  const hashedPassword = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    hashedPassword,
  );
  return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);
