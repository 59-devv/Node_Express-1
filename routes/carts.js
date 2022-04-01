const express = require('express');
const cart = require('../schemas/cart');
const Carts = require('../schemas/cart');
const Goods = require('../schemas/goods');
const router = express.Router();

router.get('/carts', async (req, res) => {
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

module.exports = router;
