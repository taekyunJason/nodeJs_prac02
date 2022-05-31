require("dotenv").config();
const express = require("express");
const connect = require("./schemas");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const port = 3000;

//접속로그 확인
const requestMiddleWare = (req, res, next) => {
  console.log("request Url : ", req.originalUrl, "-", new Date());
  next();
};

//app.use : 미들웨어를 사용
app.use(cors());
app.use(morgan("dev"));
//app.use("/", express.static(__dirname, "static"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestMiddleWare);

//라우터
const userRouter = require("./routers/user");
const menuRouter = require("./routers/uploadMenu");
const mainPageRouter = require("./routers/main");
const menuDetailRouter = require("./routers/menuDetail");
connect();

//페이지 이동
//로그인 페이지
app.get("/", async (req, res) => {
  console.log("로그인 화면입니다");
  const path = require("path");
  res.sendFile(path.join(__dirname + "/templates/login.html"));
});

//회원가입 페이지
app.get("/signUp", async (req, res) => {
  console.log("회원가입 화면입니다");
  const path = require("path");
  res.sendFile(path.join(__dirname + "/templates/signUp.html"));
});

//메인 페이지
app.get("/main", async (req, res) => {
  console.log("메인화면입니다.");
  const path = require("path");
  res.sendFile(path.join(__dirname + "/templates/main.html"));
});

//메뉴추가 페이지
app.get("/menuUpload", async (req, res) => {
  const path = require("path");
  res.sendFile(path.join(__dirname + "/templates/menuUpload.html"));
});

//메뉴상세 페이지
app.get("/show/menuDetail", async (req, res) => {
  const path = require("path");
  res.sendFile(path.join(__dirname + "/templates/menuDetail.html"));
});

//라우터 연결
app.use("/api", [userRouter, menuRouter, mainPageRouter, menuDetailRouter]);

//에러 핸들러
app.use(function (err, req, res, next) {
  console.error(err);
  res.status(500).send("Something Broke!");
});

//app.listen : 포트번호로 서버를 켜는 코드
app.listen(port, () => {
  console.log(port, "포트로 서버가 켜졌어요!");
});
