const express = require("express");
const connect = require("./schemas");
const cryptoJS = require("crypto-js");
const Nutrients = require("./schemas/data");

const app = express();
const port = 3000;

connect();

const connectRouter = (req, res, next) => {
  console.log("request Url : ", req.originalUrl, "-", new Date());
  next();
};

//app.use : 미들웨어를 사용할수 있게 해주는 코드
app.use(connectRouter);

app.use(express.json());
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

app.get("/mainData", async (req, res) => {
  const menuInfo = await Nutrients.find({});
  res.json(menuInfo);
});

app.get("/onePerson", async (req, res) => {
  const path = require("path");
  res.sendFile(path.join(__dirname + "/templates/menuOnePerson.html"));
});

app.get("/onePersonShow", async (req, res) => {
  const path = require("path");
  res.sendFile(path.join(__dirname + "/templates/menuOnePersonShow.html"));
});

app.post("/onePerson", async (req, res) => {
  const today = new Date();
  const date = today.toLocaleString();
  const { menuName, ingredient, onePerson, eatingNum, institution } = req.body;
  console.log(req.body);

  var hash = cryptoJS.SHA256(date);
  const menuId = hash["words"][0];

  const nutrient = new Nutrients({
    menuName,
    menuId,
    ingredient,
    onePerson,
    eatingNum,
    institution,
    date,
  });

  await nutrient.save();
  res.status(201).send({});
});

app.get("/", async (req, res) => {
  res.send("데이터가 전달되었습니다.");
});

//app.listen : 포트번호로 서버를 켜는 코드
app.listen(port, () => {
  console.log(port, "포트로 서버가 켜졌어요!");
});
