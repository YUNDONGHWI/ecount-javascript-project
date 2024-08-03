require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.BACK_PORT;
const cors = require("./cors");
const router = require("./router");
const controller = require("./controller");

app.get("/", (req, res) => {
    res.send("Hello World!");
});
/**
 * express에 등록된 미들웨어는 등록 순서대로 실행됩니다.
 * CORS 미들웨어가 router보다 먼저 등록되어야 합니다.
 */
//CORS 설정
app.use(cors);

// Express Json 미들웨어
app.use(express.json());

// /api 경로 요청에 대해 router 사용
app.use("/api", router);

//서버 실행
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
