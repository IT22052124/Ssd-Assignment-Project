
const OffPay = require("../Models/OfflinePaymentModel");

const CreateOffPay = async (req, res, next) => {

  const {uid} = req.body;
  const currentDate = new Date();
  const localTime = new Date(currentDate.getTime() + (5 * 60 * 60 * 1000) + (30 * 60 * 1000));
  let path = "uploads/images/No-Image-Placeholder.png";
  if (req.file && req.file.path) path = req.file.path;
  console.log(localTime);

  const newOffPay = {

    uid: uid ,
    image: path,
    submissionDate: localTime
  };
  
  const offpay = await OffPay.create(newOffPay);
  return res.status(201).send(offpay);
};

exports.CreateOffPay = CreateOffPay;
