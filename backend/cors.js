function cors(req, res, next) {
    //cors 헤더 설정
    res.header("Access-Control-Allow-Origin", "*"); // 모든 출처 허용
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // 허용 HTTP 메서드
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, application/json, text/html"
    ); // 허용 요청 헤더

    // Preflight
    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }
    /**
     * index.js에서 cors를 미들웨어로 express에 등록했기 때문에
     * 다음 순서의 미들웨어를 next()로 호출함.
     */
    next();
}
module.exports = cors;
