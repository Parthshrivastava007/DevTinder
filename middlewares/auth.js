const adminAuth = (req, res, next) => {
  const token = "123";
  const isAuthenticated = token === "123";

  console.log("Admin authenticity is checked");
  if (!isAuthenticated) {
    res.status(401).send("Unauthorized user");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
};
