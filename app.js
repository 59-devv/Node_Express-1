// require: 설치된 모듈을 찾아서 import 한다.
const express = require('express');
// index라는 파일은 이름을 생략할 수 있기 때문에, ./schemas 만 입력
const connect = require('./schemas');
const app = express();
const port = 3000;

// connect mongoose
connect();

// good.js에서 만들어준 router를 사용하기 위해, require를 사용해서 import 한다.
// require 안에서 .js 확장자는 생략이 가능하다.
const goodsRouter = require('./routes/goods');

const requestMiddleware = (req, res, next) => {
    console.log(`Request URL: ${req.originalUrl}, ${new Date()}`);
    next();
};

// static 폴더를 찾아서, static 파일들을 서버에서 제공해준다.
app.use(express.static('static'));
// body로 들어오는 json 데이터를 parsing 해주는 middleware
app.use(express.json());
// urlencoded로 들어오는 데이터를 parsing 해주는 middleware
app.use(express.urlencoded());
app.use(requestMiddleware);

// router는 여러개 정의할 수 있다.
app.use('/api', [goodsRouter]);

app.get('/', (req, res) => {
    res.send('Hello Express!');
});

app.listen(port, () => {
    console.log(`Server Started with port ${port}`);
});
