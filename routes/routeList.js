//라우터 코드 작성

const express = require("express");
const Nutrient = require("../schemas/data");
const router = express.Router();
const cryptoJS = require("crypto-js");

router.get("/", async (req, res) => {
  const path = require("path");
  res.sendFile(path.join(__dirname + "/../templates/login.html"));
});

router.get("/main", async (req, res) => {
  const path = require("path");
  res.sendFile(path.join(__dirname + "/../templates/main.html"));
});

router.get("/onePerson", async (req, res) => {
  const path = require("path");
  res.sendFile(path.join(__dirname + "/../templates/menuOnePerson.html"));
});

router.get("/onePersonShow", async (req, res) => {
  const path = require("path");
  res.sendFile(path.join(__dirname + "/../templates/menuOnePersonShow.html"));
});

module.exports = router;
