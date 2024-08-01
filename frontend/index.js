require("dotenv").config();

const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

//정적 파일 위치한 디렉토리 설정
//path : Node.js에서 경로 다루는 내장 모듈
//path.join() : 주어진 경로 조합하여 하나의 경로 생성
//__dirname : Node.js 전역 변수. 현재 모듈이 위치한 절대 경로
app.use(express.static(path.join((__dirname, "./public"))));

//라우트 설정
//주소에 따른 정적 파일 응답.
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// test
app.get("/account", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/account/account.html"));
});

//서버 실행
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
