const express = require('express');
const router = express.Router();
const paymentController = require('../Controllers/payment-controller');

router.post('/submit', paymentController.submitPayment);
router.get('/:order_id', paymentController.getPaymentByOrderId);
module.exports = router;