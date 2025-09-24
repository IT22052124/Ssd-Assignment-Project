const express = require("express");
const ProductControllers = require("../Controllers/product-controllers");
const Router = express.Router();
const fileupload = require("../middleware/file-upload");
const authEmployee = require("../middleware/authEmployee");
const authorize = require("../middleware/authorize");
const authCustomer = require("../middleware/authCustomer");

Router.get("/", ProductControllers.listProduct);
Router.get("/update/:id", ProductControllers.listProductById);

// Protected routes - admin only
// Create product - admin only
Router.post(
  "/new",
  fileupload.single("image"),
  fileupload.checkMagic,
  ProductControllers.createProduct
);

// Delete product - admin only
Router.delete(
  "/:id",
  authEmployee,
  authorize(["admin"]),
  ProductControllers.DeleteProduct
);

// Update product - admin only
Router.put(
  "/update/:id",
  authEmployee,
  authorize(["admin"]),
  fileupload.single("image"),
  ProductControllers.UpdateProduct
);

// Update product price and quantity - admin only
Router.put(
  "/updatePriceAndQty/:id",
  authEmployee,
  authorize(["admin"]),
  ProductControllers.UpdateProductPriceQtyndStock
);

// Employee/admin routes - requires employee authentication
Router.get(
  "/RestockProduct/",
  authEmployee,
  authorize(["admin", "Cashier"]),
  ProductControllers.listRestockProduct
);
Router.get(
  "/Top-products",
  authEmployee,
  authorize(["Admin", "Cashier"]),
  ProductControllers.getTopOrderedProductsThisMonth
);
Router.get(
  "/Report",
  authEmployee,
  authorize(["admin"]),
  ProductControllers.GetProductReportByDateRange
);
Router.get(
  "/Months",
  authEmployee,
  authorize(["admin"]),
  ProductControllers.getTotalUnitsSoldPast9Months
);

module.exports = Router;
