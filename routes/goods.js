const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('this is root page');
});

router.get('/goods', (req, res) => {
  res.send('this is goods page');
});

// 생성한 router를 모듈로 내보내줌
// 즉 app.js에서 실행할 수 있도록, export 함
module.exports = router;
