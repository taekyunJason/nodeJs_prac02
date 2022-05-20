const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../schemas/user");

//회원가입
const signUp = async (req, res) => {
  const {
    userId,
    userNick,
    userName,
    userPw,
    userPwCheck,
    userEmail,
    userInstitution,
  } = req.body;

  console.log(req.body);
  //비밀번호 최소 문자 1, 숫자 1 포함 (8자리 이상) 정규식
  const pwdValidation = /^(?=.*[A-Za-z])(?=.*\d)[\w]{8,}$/;

  if (!pwdValidation.test(userPw)) {
    res.status(400).send({
      errorMessage: "비밀번호는 영문+숫자 조합으로 8자리 이상 사용해야합니다.",
    });
    return;
  }

  if (userPw !== userPwCheck) {
    res.status(400).send({
      errorMessage: "비밀번호가 일치하지 않습니다.",
    });
    return;
  }

  //아이디 닉네임 중복확인
  const existUser = await User.find({
    $or: [{ userId, userNick }],
  });
  if (existUser) {
    res.status(400).send({
      errorMessage: "이미 등록된 아이디 혹은 닉네임입니다.",
    });
    return;
  }

  const route = "webSite";
  const hashed = bcrypt.hashSync(userPw, 10);
  const user = new User({
    userId,
    userNick,
    userName,
    userPw,
    userEmail,
    userInstitution,
    route,
  });
  await user.save();
  res.status(201).send({
    result: "true",
    msg: "회원가입에 성공했습니다.",
  });
};

const login = async (req, res) => {
  const { userId, userPw } = req.body;
  const user = await User.findOne({ userId, userPw }).exec();

  if (!user) {
    res.status(401).send({
      errorMessage: "아이디 혹은 비밀번호가 잘못되었습니다.",
    });
    return;
  }
  const userName = user.userName;
  const userNick = user.userNick;
  const token = jwt.sign({ userId: user.userId }, process.env.KEY);

  res.send({ token, userId, userName, userNick });
};

const loginCheck = (req, res) => {
  const { user } = res.locals;
  res.send({ user });
};

const logOut = (req, res) => {
  localStorage.clear();
  window.location.href = "/";
  console.log("로그아웃 되었습니다.");
};

module.exports = { signUp, login, loginCheck, logOut };
