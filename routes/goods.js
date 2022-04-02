const express = require('express');
const Goods = require('../schemas/goods');
const Cart = require('../schemas/cart');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('this is root page');
});

// 전체 목록 조회
router.get('/goods', async (req, res) => {
    const { category } = req.query;
    console.log('category?', category);

    const goods = await Goods.find({ category });
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

// 장바구니 상품 조회
router.get('/goods/cart', async (req, res) => {
    const carts = await Carts.find();
    // cart에 담긴 goods id들만 가져오기 위해, map을 사용함
    const goodsIds = carts.map(cart => cart.goodsId);
    const goods = await Goods.find({ goodsId: goodsIds });
    res.json({
        carts: carts.map(cart => {
            return {
                quantity: cart.quantity,
                goods: goods.find(item => item.goodsId === cart.goodsId),
            };
        }),
    });
});

// 장바구니에 상품 담기
router.post('/goods/:goodsId/cart', async (req, res) => {
    const { goodsId } = req.params;
    const { quantity } = req.body;

    const existsCarts = await Cart.find({ goodsId: Number(goodsId) });
    if (existsCarts.length) {
        return res.status(400).json({
            success: false,
            errorMessage: '이미 장바구니에 있는 상품입니다.',
        });
    }

    await Cart.create({ goodsId: Number(goodsId), quantity });
    res.json({ success: true });
});

// 장바구니에 상품 삭제
router.delete('/goods/:goodsId/cart', async (req, res) => {
    const { goodsId } = req.params;

    const existsCarts = await Cart.find({ goodsId: Number(goodsId) });
    if (existsCarts.length) {
        await Cart.deleteOne({ goodsId: Number(goodsId) });
    }

    res.json({ success: true });
});

// 상품 수량 수정
router.put('/goods/:goodsId/cart', async (req, res) => {
    const { goodsId } = req.params;
    const { quantity } = req.body;


    const existsCarts = await Cart.find({ goodsId: Number(goodsId) });
    console.log(`existsCarts: ${existsCarts}`);
    if (!existsCarts.length) {
        return res.status(400).json({
            success: false,
            errorMessage: '장바구니에 상품이 없습니다.',
        });
    }

    if (quantity <== 0) {
        return res.status(400).json({
            success: false,
            errorMessage: '상품 수량은 1 미만일 수 없습니다.',
        });
    }

    await Cart.updateOne({ goodsId: Number(goodsId) }, { $set: { quantity } });
    res.json({ success: true });
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
