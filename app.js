require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const port = 3000;

const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const nunjucks = require("nunjucks");
const dotenv = require("dotenv");
const ColorHash = require("color-hash").default;
dotenv.config();

const webSocket = require("./socket");
const indexRouter = require("./routers");
const connect = require("./schemas");

//접속로그 확인
const requestMiddleWare = (req, res, next) => {
  console.log("request Url : ", req.originalUrl, "-", new Date());
  next();
};

app.set("port", process.env.PORT || 8005);
app.set("view engine", "html");
nunjucks.configure("templates", {
  express: app,
  watch: true,
});
connect();

const sessionMiddleware = session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
});

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/gif", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(sessionMiddleware);

app.use((req, res, next) => {
  if (!req.session.color) {
    const colorHash = new ColorHash();
    req.session.color = colorHash.hex(req.sessionID);
    console.log(req.session.color);
  }
  next();
});

app.use("/", indexRouter);

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

//페이지 이동
//로그인 페이지
app.get("/login", async (req, res) => {
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
  res.sendFile(path.join(__dirname + "/templates/main1.html"));
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

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

// app.use((err, req, res, next) => {
//   res.locals.message = err.message;
//   res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
//   res.status(err.status || 500);
//   res.render("error");
// });

//app.listen : 포트번호로 서버를 켜는 코드
const server = app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});

webSocket(server, app, sessionMiddleware);
