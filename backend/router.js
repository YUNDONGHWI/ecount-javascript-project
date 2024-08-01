/*
HTTP 요청 처리 후 컨트롤러로 전달
*/
const express = require("express");
const router = express.Router();
const controller = require("./controller");

// GET /api/test - db 커넥션 테스트
router.get("/test", controller.test);

module.exports = router;
