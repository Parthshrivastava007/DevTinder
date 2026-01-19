const express = require("express");

const app = express();

const { adminAuth } = require("../middlewares/auth");

app.use("/admin", adminAuth);

app.get("/admin/getAllData", adminAuth, (req, res) => {
  res.send("Get All Admin Data");
});

app.get("/admin/deleteAllData", adminAuth, (req, res) => {
  res.send("Delete all admin Data");
});

/*
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
*/

/*
// app.use("/", (req, res) => {
//   res.send("Hello!")
// })

// app.get("/user", (req, res) => {
//   console.log(req.query);
//   res.send("Hello from user");
// });

// app.get("/user/:userId", (req, res) => {
//   console.log(req.params);
//   res.send("Hello from user");
// });

// app.get("/user", (req, res) => {
//   res.send({ firstname: "Parth", lastname: "Shrivastava" });
// });

// app.post("/user", (req, res) => {
//   res.send("Data saved Sucessfully");
// });

// app.delete("/user", (req, res) => {
//   res.send("Data deleted Sucessfully");
// });

// app.get(/a/, (req, res) => {
//   res.send("Hello from a");
// });



// app.use("/hello", (req, res) => {
//   res.send("Hello Hello!");
// });


// app.use((req, res) => {
//   res.send("Hello from ExpressJS");
// });
*/

app.use("/test", (req, res) => {
  res.send("Hello from test ExpressJS");
});

app.listen(3000, () => {
  console.log("Server successfully created");
});
