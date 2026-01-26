const jwt = require("jsonwebtoken");
const User = require("../models/User");

// const adminAuth = (req, res, next) => {
//   const token = "123";
//   const isAuthenticated = token === "123";

//   console.log("Admin authenticity is checked");
//   if (!isAuthenticated) {
//     res.status(401).send("Unauthorized user");
//   } else {
//     next();
//   }
// };

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Token not found");
    }

    const decodedMessage = jwt.verify(token, "P@rth123");

    const { _id } = decodedMessage;

    const user = await User.findById(_id);

    if (!user) {
      res.status(404).send("User not found");
    }
    res.send(user);
    next();
  } catch (err) {
    res.status(401).send("Something went wrong");
  }
};

module.exports = {
  // adminAuth,
  userAuth,
};
