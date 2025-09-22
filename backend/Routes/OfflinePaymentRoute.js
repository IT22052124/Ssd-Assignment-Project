const express = require('express');
const router = express.Router();

const fileupload = require('../middleware/file-upload')
const offpay = require('../Controllers/offline_payment-controllers')


router.post("/new", fileupload.single('image') , offpay.CreateOffPay);

module.exports = router;
