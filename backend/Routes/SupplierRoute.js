const express = require("express");
const SupplierControllers = require("../Controllers/supplier-controllers");
const Router = express.Router();
const fileupload = require('../middleware/file-upload')

Router.post("/",fileupload.single('image'), SupplierControllers.createSupplier);
Router.get("/", SupplierControllers.listSupplier);
Router.delete("/:id", SupplierControllers.DeleteSupplier);
Router.get("/:id", SupplierControllers.listSupplierById);
Router.put("/:id",fileupload.single('image'), SupplierControllers.UpdateSupplier);
Router.put("/updateCredit/:id",SupplierControllers.UpdateSupplierCredit);


module.exports = Router;
