const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../schemas/user");

const signUp = async (req, res) => {
  const {
    userId,
    userPw,
    pwdCheck,
    userName,
    userNick,
    userEmail,
    userInstitution,
  } = req.body;
  //비밀번호 최소 문자 1, 숫자 1 포함 (8자리 이상) 정규식
  const pwdValidation = /^(?=.*[A-Za-z])(?=.*\d)[\w]{8,}$/;

  console.log(userPw);
  if (!pwdValidation.test(userPw)) {
    res.status(400).send({
      errorMessage: "비밀번호는 영문+숫자 조합으로 8자리 이상 사용해야합니다.",
    });
    return;
  }

  if (userPw !== pwdCheck) {
    res.status(400).send({
      errorMessage: "비밀번호가 일치하지 않습니다.",
    });
    return;
  }

  //아이디 닉네임 중복확인
  const existUser = await User.find({
    $or: [{ userId, userNick }],
  });
  if (existUser.length) {
    res.status(400).send({
      errorMessage: "이미 등록된 아이디 혹은 닉네임입니다.",
    });
    return;
  }

  const route = "webSite";
  const hashed = bcrypt.hashSync(userPw, 10);
  const user = new User({
    userId,
    userPw: hashed,
    userName,
    userNick,
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

// const idCheck = async (req, res) => {
//   const { userId } = req.body;
//   const existUser = await User.find({
//     $or: [{ userId }],
//   });
//   if (existUser.length) {
//     res.status(400).send({
//       errorMessage: "이미 등록된 아이디입니다.",
//     });
//     return;
//   }
//   res.send("사용 가능한 아이디입니다.");
// };

const login = async (req, res) => {
  const { userId, pwd } = req.body;
  const user = await User.findOne({ userId, pwd }).exec();

  if (!user) {
    res.status(401).send({
      errorMessage: "아이디 혹은 비밀번호가 잘못되었습니다.",
    });
    return;
  }
  const userName = user.userName;
  const userAddress = user.userAddress;
  const token = jwt.sign({ userId: user.userId }, "my-secret-key");

  res.send({ token, userId, userName, userAddress });
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
