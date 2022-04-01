const mongoose = require('mongoose');
const connect = () => {
    mongoose
        .connect('mongodb://localhost:27017/spa_mall', {
            ignoreUndefined: true,
        })
        .catch(err => console.log(err));
};

module.exports = connect;
