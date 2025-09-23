const express = require("express");
const router = express.Router();
const orderController = require("../Controllers/order-controllers");
const authCustomer = require("../middleware/authCustomer");
const authEmployee = require("../middleware/authEmployee");
const authorize = require("../middleware/authorize");
const checkOwnership = require("../middleware/checkOwnership");

router.post("/new", authCustomer, orderController.createOrder);

router.get(
  "/:pid/:uid",
  authCustomer,
  (req, res, next) => {
    if (req.params.uid !== req.customer.id) {
      return res
        .status(403)
        .json({ message: "Forbidden - You can only access your own orders" });
    }
    next();
  },
  orderController.checkOrder
);

router.get(
  "/:uid",
  authCustomer,
  (req, res, next) => {
    if (req.params.uid !== req.customer.id) {
      return res
        .status(403)
        .json({ message: "Forbidden - You can only access your own orders" });
    }
    next();
  },
  orderController.listOrderById
);

router.get(
  "/latest/:userId",
  authCustomer,
  (req, res, next) => {
    if (req.params.userId !== req.customer.id) {
      return res
        .status(403)
        .json({ message: "Forbidden - You can only access your own orders" });
    }
    next();
  },
  orderController.latestOrder
);

router.get(
  "/",
  authEmployee,
  authorize(["admin", "Cashier"]),
  orderController.listOrder
);

router.get(
  "/orders",
  authEmployee,
  authorize(["admin", "Cashier"]),
  orderController.listOrders
);

router.get(
  "/report",
  authEmployee,
  authorize(["admin"]),
  orderController.GetProductReportByDateRange
);

module.exports = router;
