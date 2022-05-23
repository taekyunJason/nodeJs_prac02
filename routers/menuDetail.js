const express = require("express");
const router = express.Router();
const { menuDetail } = require("../controllers/menuDetail");
const authMiddleware = require("../middlewares/authMiddleWare");
require("dotenv").config();

router.get("/main/menuDetail", authMiddleware, menuDetail);

module.exports = router;
