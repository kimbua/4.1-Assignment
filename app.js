const express = require("express");
const logger = require("morgan");
app.use(logger("dev"));
const app = express();
const port = 5000;

let { jobs } = require("./data.json")

app.get("/", (req, res) => {
  res.send("Hello Programmers");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});