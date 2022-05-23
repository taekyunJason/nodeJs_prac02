const express = require("express");
const router = express.Router();
const { search } = require("../controllers/main");
const authMiddleware = require("../middlewares/authMiddleWare");
require("dotenv").config();

router.get("/main/search", search);

module.exports = router;
