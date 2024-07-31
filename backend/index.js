const express = require('express');
const app = express();
const port = 3000;
const router = require('./app');
const controller = require('./controller');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//CORS 설정 후 라우터 사용 필요.

//서버 실행
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//테스트 목적으로 컨트롤러 직접 호출
controller.test();