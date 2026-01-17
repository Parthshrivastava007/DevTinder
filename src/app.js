const express = require("express");

const app = express();

app.use("/test", (req, res) => {
  res.send("Hello from test ExpressJS");
});

app.use("/hello", (req, res) => {
  res.send("Hello Hello!");
});

app.use((req, res) => {
  res.send("Hello from ExpressJS");
});

app.listen(3000, () => {
  console.log("Server successfully created");
});
