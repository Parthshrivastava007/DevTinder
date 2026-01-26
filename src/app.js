const express = require("express");
const connectDB = require("../config/db");
const app = express();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { userAuth } = require("../middlewares/auth");
// const { adminAuth } = require("../middlewares/auth");
const { signUpValidation } = require("../utlis/validations");

app.use(express.json());
app.use(cookieParser());

app.post("/signUp", async (req, res, err) => {
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
    res.status(400).send("User cannot be added");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await User.isValidPassword(password);

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

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(404).send("ERROR: " + err.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user.firstName + "sent the connection request");
  } catch (err) {
    res.status(404).send("ERROR: " + err.message);
  }
});

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

/*
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const users = await User.find({ emailId: userEmail });
    res.send(users);
    if (users.length === 0) {
      res.status(404).send("User Not found");
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.json(allUsers);
  } catch (error) {
    res.status(400).json("Something went wrong");
  }
});

app.delete("/delete", async (req, res) => {
  const { emailId } = req.body;

  try {
    if (!emailId) {
      return res.status(400).send("emailId is required");
    }

    const user = await User.findOneAndDelete({ emailId });

    if (!user) {
      return res.status(404).send("User Not Found");
    }

    res.status(200).send("User deleted Sucessfully");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Something went wrong");
  }
});

app.patch("/updateUser/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["skills", "about"];
    const isUpdateAllowed = Object.keys(data).every((key) =>
      ALLOWED_UPDATES.includes(key),
    );

    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }

    if (data.skills && data.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(user);
    res.send("User Updated sucessfully");
  } catch (err) {
    res.status(400).send("Update Failed: " + err.message);
  }
});
*/

/*
  app.use("/user", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong!!");
  }
});

app.use("/admin", adminAuth);

app.get("/admin/getAllData", adminAuth, (req, res) => {
  res.send("Get All Admin Data");
});

app.get("/admin/deleteAllData", adminAuth, (req, res) => {
  res.send("Delete all admin Data");
});

// Usage of next()
app.use("/", (req, res, next) => {
  console.log("Hello");
  next();
});

app.get("/user", [
  (req, res, next) => {
    console.log("Handling user 1");
    next();
    // res.send("Response");
  },
  (req, res, next) => {
    console.log("Handling user 2");
    // res.send("Response 2");
    next();
  },
  (req, res, next) => {
    console.log("Handling user 2");
    res.send("Response 3");
  },
]);

app.use("/", (req, res) => {
  res.send("Hello!");
});

app.get("/user", (req, res) => {
  console.log(req.query);
  res.send("Hello from user");
});

app.get("/user/:userId", (req, res) => {
  console.log(req.params);
  res.send("Hello from user");
});

app.get("/user", (req, res) => {
  res.send({ firstname: "Parth", lastname: "Shrivastava" });
});

app.post("/user", (req, res) => {
  res.send("Data saved Sucessfully");
});

app.delete("/user", (req, res) => {
  res.send("Data deleted Sucessfully");
});

app.get(/a/, (req, res) => {
  res.send("Hello from a");
});

app.use("/hello", (req, res) => {
  res.send("Hello Hello!");
});

app.use((req, res) => {
  res.send("Hello from ExpressJS");
});

app.use("/test", (req, res) => {
  res.send("Hello from test ExpressJS");
});
*/
