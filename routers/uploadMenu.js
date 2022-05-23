const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleWare");
const { uploadMenu } = require("../controllers/uploadMenu");
require("dotenv").config();

router.post("/main/menu/upload", authMiddleware, uploadMenu);

module.exports = router;
