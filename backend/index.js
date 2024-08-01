const express = require("express");
const app = express();
const port = 5000;
const router = require("./router");
const controller = require("./controller");

app.get("/", (req, res) => {
    res.send("Hello World!");
});

//CORS 설정 후 라우터 사용 필요.

// /api 경로 요청에 대해 router 사용
app.use("/api", router);

//서버 실행
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
