const HttpError = require("../Models/http-error");
const Customer = require("../Models/CustomerModel");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const fs = require("fs");
const Order = require("../Models/OrderModel");
const moment = require("moment");

const createCustomer = async (req, res, next) => {
  const { name, telephone, mail, address, city, password } = req.body;

  const latestCustomer = await Customer.find().sort({ _id: -1 }).limit(1);
  let id;

  if (latestCustomer.length !== 0) {
    const latestId = parseInt(latestCustomer[0].ID.slice(1));
    id = "C" + String(latestId + 1).padStart(4, "0");
  } else {
    id = "C0001";
  }

  let path = "uploads/images/No-Image-Placeholder.png";
  if (req.file && req.file.path) path = req.file.path;

  const newCustomer = {
    ID: id,
    name: name,
    telephone: telephone,
    mail: mail,
    address: address,
    city: city,
    password: await bcrypt.hash(password, 12),
    image: path,
  };

  const customer = await Customer.create(newCustomer);
  return res.status(201).send(customer);
};

const listCustomer = async (req, res) => {
  try {
    const customer = await Customer.find({}, { password: 0 });
    return res.status(200).json(customer);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};
const listCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findById(id).select("-password");

    return res.status(200).json(customer);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const UpdateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const allowed = {};
    if (typeof req.body.name === "string") allowed.name = req.body.name;
    if (typeof req.body.telephone === "string")
      allowed.telephone = req.body.telephone;
    if (typeof req.body.mail === "string") allowed.mail = req.body.mail;
    if (typeof req.body.address === "string")
      allowed.address = req.body.address;
    if (typeof req.body.city === "string") allowed.city = req.body.city;
    if (
      typeof req.body.password === "string" &&
      req.body.password.trim().length > 0
    ) {
      allowed.password = await bcrypt.hash(req.body.password, 12);
    }
    const result = await Customer.findByIdAndUpdate(id, { $set: allowed });

    if (!result) {
      return res.status(404).send({ message: "Customer Not Found !" });
    }

    return res.status(200).send({ message: "Customer Updated Successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const DeleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Customer.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send({ message: "Customer Not Found !" });
    }

    return res.status(200).send({ message: "Customer Deleted Successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const getTopCustomersThisMonth = async (req, res) => {
  try {
    const startOfMonth = moment("2024-01-01");
    const endOfMonth = moment().endOf("month");

    const topCustomers = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfMonth.toDate(), $lte: endOfMonth.toDate() },
        },
      },
      { $unwind: "$CartItems" },
      {
        $lookup: {
          from: "products",
          localField: "CartItems.productId",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      {
        $group: {
          _id: "$userId",
          totalAmount: {
            $sum: {
              $multiply: [
                { $toInt: "$CartItems.quantity" },
                { $toDouble: "$product.price" },
              ],
            },
          },
        },
      },
      { $sort: { totalAmount: -1 } },
      { $limit: 5 },
    ]);

    const customerIds = topCustomers.map((item) => item._id);

    const populatedCustomers = await Customer.find({
      _id: { $in: customerIds },
    });

    const topCustomersDetails = topCustomers.map((item) => {
      const customerDetail = populatedCustomers.find(
        (customer) => customer._id.toString() === item._id.toString()
      );
      return {
        customer: customerDetail,
        totalAmount: item.totalAmount,
      };
    });

    res.json(topCustomersDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.createCustomer = createCustomer;
exports.listCustomer = listCustomer;
exports.UpdateCustomer = UpdateCustomer;
exports.listCustomerById = listCustomerById;
exports.DeleteCustomer = DeleteCustomer;
exports.getTopCustomersThisMonth = getTopCustomersThisMonth;
