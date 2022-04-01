const mongoose = require('mongoose');

const goodsSchema = new mongoose.Schema({
    goodsId: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    thumbnailUrl: {
        type: String,
    },
    category: {
        type: String,
    },
    price: {
        type: Number,
    },
});

// mongoose.model() 의 첫번째 인자가 Collection의 이름이 되는 것이다.
module.exports = mongoose.model('Goods', goodsSchema);
