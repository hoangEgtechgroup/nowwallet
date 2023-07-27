const express = require('express');
const auth = require('../controller/auth.controller');
const transfer = require('../controller/transfer_money.controller');

const router = express.Router();
const AUTH = (app) => {
    router.post('/register', auth.register); //method POST -> register account
    router.post('/login', auth.login); //method POST -> login account
    return app.use('/api/auth/', router)
}

const TRANSFER = (app) => {

    router.post('/transfer_money', transfer.tranfer_money); //method POST -> login account

    return app.use('/api/transfer/', router)
}


module.exports = {
    AUTH,
    TRANSFER
};