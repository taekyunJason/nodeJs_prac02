const express = require("express");
const router = express.Router();
const { uploadMenu } = require("../controllers/uploadMenu");
require("dotenv").config();

router.post("/main/menu/upload", uploadMenu);

module.exports = router;
