require("dotenv").config();
const express = require("express");
const connect = require("./schemas");
const cors = require("cors");
const Nutrients = require("./schemas/menu");
const app = express();
const port = 3000;

//접속로그 확인
const requestMiddleWare = (req, res, next) => {
  console.log("request Url : ", req.originalUrl, "-", new Date());
  next();
};

//app.use : 미들웨어를 사용할수 있게 해주는 코드
app.use(cors());
app.use(express.json());
app.use(requestMiddleWare);
app.use(express.urlencoded({ extended: false }));

//라우터
const userRouter = require("./routers/user");
const menuRouter = require("./routers/uploadMenu");
const mainPageRouter = require("./routers/main");
connect();

// app.get("/mainData", async (req, res) => {
//   const menuInfo = await Nutrients.find({});
//   res.json(menuInfo);
// });

// app.post("/onePerson", async (req, res) => {
//   const today = new Date();
//   const date = today.toLocaleString();
//   const { menuName, ingredient, onePerson, eatingNum, institution } = req.body;
//   console.log(req.body);

//   var hash = cryptoJS.SHA256(date);
//   const menuId = hash["words"][0];

//   const nutrient = new Nutrients({
//     menuName,
//     menuId,
//     ingredient,
//     onePerson,
//     eatingNum,
//     institution,
//     date,
//   });

//   await nutrient.save();
//   res.status(201).send({});
// });

// app.get("/", async (req, res) => {
//   res.send("데이터가 전달되었습니다.");
// });

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

//1인량 입력 페이지
app.get("/onePerson", async (req, res) => {
  const path = require("path");
  res.sendFile(path.join(__dirname + "/templates/menuOnePerson.html"));
});

//1인량 보여주기 페이지
app.get("/onePersonShow", async (req, res) => {
  const path = require("path");
  res.sendFile(path.join(__dirname + "/templates/menuOnePersonShow.html"));
});

//라우터 연결
app.use("/api", [userRouter, menuRouter, mainPageRouter]);

//app.listen : 포트번호로 서버를 켜는 코드
app.listen(port, () => {
  console.log(port, "포트로 서버가 켜졌어요!");
});
