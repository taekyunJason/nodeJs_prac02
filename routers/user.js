const express = require("express");
const router = express.Router();
const { signUp, login, loginCheck, logOut } = require("../controllers/user");
const authMiddleware = require("../middleware/authMiddleWare");
require("dotenv").config();

router.post("/signUp", signUp);

router.post("/reqLogin", login);

router.get("/loginCheck", authMiddleware, loginCheck);

router.get("/login/logOut", logOut);

module.exports = router;
