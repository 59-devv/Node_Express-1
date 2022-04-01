const express = require('express');
const Goods = require('../schemas/goods');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('this is root page');
});

// 전체 목록 조회
router.get('/goods', async (req, res) => {
  const goods = await Goods.find();
  res.json({
    // goods: goods,
    // 객체의 이름이 key와 똑같다면, 약식으로 하나만 써주어도 된다.
    goods,
  });
});

// 특정 상품 조회
router.get('/goods/:goodsId', async (req, res) => {
  // URL에서 가져올 때, goodId는 string이다.
  const { goodsId } = req.params;

  const [detail] = await Goods.find({ goodsId: Number(goodsId) });

  res.json({
    detail,
  });
});

// 상품 추가
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
