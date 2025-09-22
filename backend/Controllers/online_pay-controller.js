const multer = require("multer");

const Online = require("../Models/OnlinePayModel");

const Cryptr = require("cryptr");
const cryptr = new Cryptr("your-secret-key");

const OnlinePay = async (req, res, next) => {
  

  const { uid,firstname, lastname, cvv, category, expiredate, number } = req.body;
  const latestCard = await Online.find().sort({ _id: -1 }).limit(1);
  let id;

  if (Array.isArray(latestCard) && latestCard.length !== 0) {
    const latestId = parseInt(latestCard[0].id.slice(1));
    id = "P" + String(latestId + 1).padStart(4, "0");
  } else {
    id = "P0001";
  }
  let encryptedCardNumber = cryptr.encrypt(number);
  let encryptedcvv = cryptr.encrypt(cvv);

  const newCard = {
    uid: uid,
    id: id,
    firstname: firstname,
    lastname: lastname,
    cvv: encryptedcvv,
    category: category,
    expiredate: expiredate,
    number: encryptedCardNumber,
  };

  const Pay = await Online.create(newCard);

  return res.status(201).send(Pay);
};

const listCard = async (req, res) => {
  try {
    const pay = await Online.find({});
    return res.status(200).json(pay);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};
const listCardByUId = async (req, res) => {
  const {uid}= req.params;
  const cryptr = new Cryptr("your-secret-key");
  try {
    const pay = await Online.find({ uid: uid });

    const decryptedPay = pay.map((card) => {
      const decryptedCard = { ...card._doc }; // clone the card object
      decryptedCard.number = cryptr.decrypt(card.number); // decrypt the card number
      decryptedCard.cvv = cryptr.decrypt(card.cvv); // decrypt the cvv
      return decryptedCard;
    });
    return res.status(200).json(decryptedPay);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const listCardById = async (req, res) => {
  const { id } = req.params;
  const cryptr = new Cryptr("your-secret-key");
  try {
    const pay = await Online.findById(id);

    const decryptedCard = { ...pay._doc };
    decryptedCard.number = cryptr.decrypt(pay.number); // decrypt the card number
    decryptedCard.cvv = cryptr.decrypt(pay.cvv); // decrypt the cvv
    decryptedPay = decryptedCard;

    return res.status(200).json(decryptedPay);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const UpdateCard = async (req, res) => {
  try {
    const { id } = req.params;

    const { firstname, lastname, cvv, category, expiredate, number } = req.body;

    console.log("naem", id);
    let encryptedCardNumber = cryptr.encrypt(number);
    let encryptedcvv = cryptr.encrypt(cvv);

    const UpdateCard = {
      firstname: firstname,
      lastname: lastname,
      cvv: encryptedcvv,
      category: category,
      expiredate: expiredate,
      number: encryptedCardNumber,
    };

    const result = await Online.findByIdAndUpdate(id, UpdateCard);

    if (!result) {
      return res.status(404).send({ message: "Product Not Find !" });
    }

    return res.status(200).send({ message: "Product Updated Successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const DeleteCard = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Online.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send({ message: "Product Not Find !" });
    }

    return res.status(200).send({ message: "Product Deleted Successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

exports.OnlinePay = OnlinePay;
exports.listCard = listCard;
exports.UpdateCard = UpdateCard;
exports.listCardByUId = listCardByUId;
exports.DeleteCard = DeleteCard;
exports.listCardById = listCardById;
