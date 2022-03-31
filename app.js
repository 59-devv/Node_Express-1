// require: 설치된 모듈을 찾아서 import 한다.
const express = require('express');
const app = express();
const port = 8080;

const requestMiddleware = (req, res, next) => {
  console.log(`Request URL: ${req.originalUrl}, ${new Date()}`);
  next();
};

app.use(requestMiddleware);

app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.listen(port, () => {
  console.log(`Server Started with port ${port}`);
});
