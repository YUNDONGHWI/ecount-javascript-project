/*
HTTP 요청 처리 후 컨트롤러로 전달
*/
const express = require("express");
const router = express.Router();
const controller = require("./controller");

// GET /api/test - db 커넥션 테스트
router.get("/test", controller.test);

// DB 모든 정보 조회
router.get("/account-book", controller.getAllData)

// 수입.지출 데이터 저장
router.post("/account-book", controller.createData)

module.exports = router;
