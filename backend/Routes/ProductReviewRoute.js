const express = require("express");
const Router = express.Router();
const ProductReviewController = require("../Controllers/productReview-controllers")

Router.post("/new",ProductReviewController.createProductReview);
Router.get("/product/:pid", ProductReviewController.listProductReviewsByID);
Router.get("/", ProductReviewController.listProductReviews);
Router.delete("/delete/:id", ProductReviewController.DeleteProductReviewByUser)
// Router.get("/update/:id", ProductControllers.listProductById);
// Router.put(
//   "/update/:id",
//   fileupload.single("image"),
//   ProductControllers.UpdateProduct
// );
// Router.put(
//   "/updatePriceAndQty/:id",
//   ProductControllers.UpdateProductPriceQtyndStock
// );
// Router.get("/RestockProduct/", ProductControllers.listRestockProduct);

module.exports = Router;
