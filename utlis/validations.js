const validator = require("validator");

const signUpValidation = (req) => {
  const body = req.body || {};

  const { firstName, lastName, emailId, password } = body;

  if (!firstName || !lastName) {
    throw new Error("Name is invalid");
  }

  if (!emailId || !validator.isEmail(emailId)) {
    throw new Error("Email Id is invalid");
  }

  if (!password || !validator.isStrongPassword(password)) {
    throw new Error("Password should be strong");
  }
};

module.exports = {
  signUpValidation,
};
