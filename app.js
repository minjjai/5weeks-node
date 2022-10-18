const express = require("express");
const { db } = require("./models/index.js");
const app = express();
const port = 3000;
const Router = require("./routes/index.js");

db;
app.use(express.json());

app.use("/api", Router);

app.get("/", (req, res) => {
  res.send("테스트 테스트");
});
app.listen(port, () => {
  console.log(port, " 포트로 서버가 켜졌어요!!");
});
