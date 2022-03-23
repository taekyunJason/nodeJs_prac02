const express = require("express");
const connect = require("./schemas");
const router = require("./routes/routeList");
const app = express();
const port = 3000;

connect();

const connectRouter = (req, res, next) => {
  console.log("미들웨어 실행");
  next();
};

app.use(express.json());

//미들웨어를 사용할수 있게 해주는 코드
app.use(connectRouter);

app.use("/untrient", [router]);

//get으로 첫번째 인자로 접근했을때, 다음 함수를 실행시킴
app.get("/", (req, res) => {
  res.send("Please type 000 behind on your URL!");
});

//포트번호로 서버를 켜는 코드
app.listen(port, () => {
  console.log(port, "포트로 서버가 켜졌어요!");
});
