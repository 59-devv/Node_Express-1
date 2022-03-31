// require: 설치된 모듈을 찾아서 import 한다.
const express = require('express');
const app = express();
const port = 8080;

// good.js에서 만들어준 router를 사용하기 위해, require를 사용해서 import 한다.
// require 안에서 .js 확장자는 생략이 가능하다.
const goodsRouter = require('./routes/goods');

const requestMiddleware = (req, res, next) => {
  console.log(`Request URL: ${req.originalUrl}, ${new Date()}`);
  next();
};

app.use(requestMiddleware);

// router는 여러개 정의할 수 있다.
app.use('/api', [goodsRouter]);

app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.listen(port, () => {
  console.log(`Server Started with port ${port}`);
});