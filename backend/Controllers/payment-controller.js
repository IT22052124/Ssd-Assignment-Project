const Payment = require('../Models/PaymentModel');

exports.submitPayment = async (req, res, next) => {
  try {
    const { subtotal, shippingFee, total, card_id, user_id, method, Order_id } = req.body;
    const currentDate = new Date();
    const localTime = new Date(currentDate.getTime() + (5 * 60 * 60 * 1000) + (30 * 60 * 1000));
    const payment = new Payment({
      subtotal: subtotal,
      shippingFee: shippingFee,
      total: total,
      card_id: card_id,
      user_id: user_id,
      submissionDate: localTime,
      Method: method,
      
    });
    const savedPayment = await payment.save();
    res.json(savedPayment);
  } catch (error) {
    next(error);
  }
};

exports.getPaymentByOrderId = async (req, res, next) => {
  try {
    const { order_id } = req.params;
    const payment = await Payment.findOne({ Order_id: order_id });
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json(payment);
  } catch (error) {
    next(error);
  }
};
