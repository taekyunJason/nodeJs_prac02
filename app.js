const express = require("express");
const connect = require("./schemas");
const cryptoJS = require("crypto-js");
const Nutrient = require("./schemas/data");
const app = express();
const port = 3000;

connect();

const connectRouter = (req, res, next) => {
  console.log("request Url : ", req.originalUrl, "-", new Date());
  next();
};

app.use(express.json());

//app.use : 미들웨어를 사용할수 있게 해주는 코드
app.use(connectRouter);

//get으로 첫번째 인자로 접근했을때, 다음 함수를 실행시킴
app.get("/", async (req, res) => {
  console.log("로그인 화면입니다");
  const path = require("path");
  res.sendFile(path.join(__dirname + "/templates/login.html"));
});

app.get("/main", async (req, res) => {
  console.log("메인화면입니다.");
  const path = require("path");
  res.sendFile(path.join(__dirname + "/templates/main.html"));
});

app.get("/onePerson", async (req, res) => {
  const path = require("path");
  res.sendFile(path.join(__dirname + "/templates/menuOnePerson.html"));
});

app.get("/onePersonShow", async (req, res) => {
  const path = require("path");
  res.sendFile(path.join(__dirname + "/templates/menuOnePersonShow.html"));
});

app.post("/detail", async (req, res) => {
  const today = new Date();
  const date = today.toLocaleString();
  const { menuName, institution, ingredient, onePerson, eatingNum } = req.body;
  //   const postId = Post_ls[Post_ls.length - 1]["postId"];

  const getId = await Nutrient.find({});
  //   console.log(getId);

  var hash = cryptoJS.SHA256(date);
  const menuId = hash["words"][0];

  //   const postId = getId[getId.length - 1]["postId"] + 1;
  //   console.log(postIdCnt);

  //   const postId = await Posts.find({ postId: postIdCnt });

  //   if (postId.length) {
  //     return res.status(400).json({
  //       success: false,
  //       errorMessage: "이미 저장된 데이터 입니다.",
  //     });
  //   } else {
  const Menu_ls = await Nutrient.create({
    menuName,
    menuId,
    institution,
    ingredient,
    onePerson,
    eatingNum,
    date,
  });
});

//app.listen : 포트번호로 서버를 켜는 코드
app.listen(port, () => {
  console.log(port, "포트로 서버가 켜졌어요!");
});
