const express = require("express");
const SupplierProductControllers = require("../Controllers/SupplierProduct-controller");
const Router = express.Router();

Router.post("/", SupplierProductControllers.createSupplierProduct);
Router.delete("/:id", SupplierProductControllers.DeleteSupplierProduct);
Router.get("/", SupplierProductControllers.listSupplierProduct);
Router.get("/:id", SupplierProductControllers.listSupplierProductById);
Router.get("/supplier/:id", SupplierProductControllers.listProductBySupplierId);
Router.get("/product/:id", SupplierProductControllers.listSupplierByProductId);
Router.put("/:id", SupplierProductControllers.UpdateSupplierProduct);
Router.put("/updatePrice/:id", SupplierProductControllers.UpdateSupplierProductPrice);
Router.get("/addproduct/:id", SupplierProductControllers.listProductsNotAssignedToSupplier);
Router.post("/purchase", SupplierProductControllers.SupplierPurchase)
Router.get("/purchase/list", SupplierProductControllers.listPurchase)
Router.get("/purchase/list/:id", SupplierProductControllers.listOnePurchasedetails)
Router.put("/confirmDelivery/:id", SupplierProductControllers.confirmDelivery)
Router.get("/pendingCount/count", SupplierProductControllers.pendingOrderCount)
Router.get("/report/new", SupplierProductControllers.makeReport)


module.exports = Router;