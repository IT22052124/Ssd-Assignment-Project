const express = require("express");
const ProductControllers = require("../Controllers/product-controllers");
const Router = express.Router();
const fileupload = require("../middleware/file-upload");

Router.post(
  "/new",
  fileupload.single("image"),
  ProductControllers.createProduct
);
Router.get("/", ProductControllers.listProduct);
Router.delete("/:id", ProductControllers.DeleteProduct);

Router.get("/update/:id", ProductControllers.listProductById);
Router.put(
  "/update/:id",
  fileupload.single("image"),
  ProductControllers.UpdateProduct
);
Router.put(
  "/updatePriceAndQty/:id",
  ProductControllers.UpdateProductPriceQtyndStock
);
Router.get("/RestockProduct/", ProductControllers.listRestockProduct);
Router.get("/Top-products", ProductControllers.getTopOrderedProductsThisMonth)
Router.get("/Report", ProductControllers.GetProductReportByDateRange)
Router.get("/Months", ProductControllers.getTotalUnitsSoldPast9Months)

module.exports = Router;
