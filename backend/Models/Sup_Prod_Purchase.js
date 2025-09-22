const mongoose = require("mongoose");

const Sup_Prod_PurchaseSchema = mongoose.Schema(
    {
        purchaseID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Purchase',
        },
        supplier_product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SupplierProduct',
        },
        Quantity: {
            type: Number,
            required: [true, "Please Enter Quantity"],
        }
    },
    {
      timestamps: true,
    }
);

const supplierproductpurchase = mongoose.model("SupplierProductPurchase",Sup_Prod_PurchaseSchema);
module.exports = supplierproductpurchase;