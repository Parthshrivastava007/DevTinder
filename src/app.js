const express = require("express");

const app = express();

// app.use("/", (req, res) => {
//   res.send("Hello!")
// })

// app.get("/user", (req, res) => {
//   console.log(req.query);
//   res.send("Hello from user");
// });

app.get("/user/:userId", (req, res) => {
  console.log(req.params);
  res.send("Hello from user");
});

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

app.use("/test", (req, res) => {
  res.send("Hello from test ExpressJS");
});

// app.use("/hello", (req, res) => {
//   res.send("Hello Hello!");
// });

// app.use((req, res) => {
//   res.send("Hello from ExpressJS");
// });

app.listen(3000, () => {
  console.log("Server successfully created");
});
