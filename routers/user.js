const express = require("express");
const router = express.Router();
const { signUp, login, loginCheck, logOut } = require("../controllers/user");
const authMiddleware = require("../middlewares/authMiddleWare");
require("dotenv").config();

router.post("/user/signUp", signUp);

router.post("/user/reqLogin", login);

router.get("/user/loginCheck", authMiddleware, loginCheck);

router.get("/user/login/logOut", logOut);

module.exports = router;
