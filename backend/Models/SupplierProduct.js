const mongoose = require("mongoose");

const supplierProductSchema = mongoose.Schema(
    {
        supplier: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Supplier',
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
        unitPrice: {
            type: Number,
            required: [true, "Please Enter Unit Price"],
        }
    },
    {
      timestamps: true,
    }
);

const supplierproduct = mongoose.model("SupplierProduct",supplierProductSchema);
module.exports = supplierproduct;