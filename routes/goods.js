const express = require('express');
const Goods = require('../schemas/goods');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('this is root page');
});

const goods = [
  {
    goodsId: 4,
    name: '상품 4',
    thumbnailUrl:
      'https://cdn.pixabay.com/photo/2016/09/07/02/11/frogs-1650657_1280.jpg',
    category: 'drink',
    price: 0.1,
  },
  {
    goodsId: 3,
    name: '상품 3',
    thumbnailUrl:
      'https://cdn.pixabay.com/photo/2016/09/07/02/12/frogs-1650658_1280.jpg',
    category: 'drink',
    price: 2.2,
  },
  {
    goodsId: 2,
    name: '상품 2',
    thumbnailUrl:
      'https://cdn.pixabay.com/photo/2014/08/26/19/19/wine-428316_1280.jpg',
    category: 'drink',
    price: 0.11,
  },
  {
    goodsId: 1,
    name: '상품 1',
    thumbnailUrl:
      'https://cdn.pixabay.com/photo/2016/09/07/19/54/wines-1652455_1280.jpg',
    category: 'drink',
    price: 6.2,
  },
];

router.get('/goods', (req, res) => {
  res.json({
    // goods: goods,
    // 객체의 이름이 key와 똑같다면, 약식으로 하나만 써주어도 된다.
    goods,
  });
});

router.get('/goods/:goodsId', (req, res) => {
  // URL에서 가져올 때, goodId는 string이다.
  const goodsId = req.params.goodsId;

  // 배열의 첫번째만 가져오기 위해서, [0]으로 가져올 수도 있지만
  // '비구조화(destructuring)'을 사용하면 간편하게 가져올 수 있다.
  const [detail] = goods.filter(item => item.goodsId === Number(goodsId));

  res.json({
    detail,
  });
});

router.post('/goods', async (req, res) => {
  const { goodsId, name, thumbnailUrl, category, price } = req.body;

  const goods = await Goods.find({ goodsId });
  if (goods.length) {
    return res.status(400).json({
      success: false,
      errorMessage: '이미 있는 데이터입니다.',
    });
  }
  const createdGoods = await Goods.create({
    goodsId,
    name,
    thumbnailUrl,
    category,
    price,
  });
  res.json({ createdGoods });
});

// 생성한 router를 모듈로 내보내줌
// 즉 app.js에서 실행할 수 있도록, export 함
module.exports = router;
