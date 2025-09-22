const HttpError = require("../Models/http-error");
const SupplierProduct = require("../Models/SupplierProduct");
const uuid = require("uuid");
const Product = require("../Models/ProductModel");
const Purchase = require("../Models/PurchaseModel");
const SupplierProductPurchase = require("../Models/Sup_Prod_Purchase");
const Supplier = require("../Models/SupplierModel");
const Cost = require("../Models/CostModel")

const createSupplierProduct = async (req, res, next) => {
  const { supplier, product, unitPrice} = req.body;


  const newSupplierProduct = {
    supplier: supplier,
    product: product,
    unitPrice: unitPrice,
  };

  const supplierProduct = await SupplierProduct.create(newSupplierProduct);
  return res.status(201).send(supplierProduct);
  
};

const listSupplierProduct = async (req, res) => {
  try {
    const supplierProduct = await SupplierProduct.find({});

    return res.status(200).json(supplierProduct);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }

};

const listProductsNotAssignedToSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const productsAssignedToSupplier = await SupplierProduct.find({ supplier: id }).distinct('product');

    const productsNotAssignedToSupplier = await Product.find({ _id: { $nin: productsAssignedToSupplier } });

    return res.status(200).json(productsNotAssignedToSupplier);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const listSupplierProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const supplierProduct = await SupplierProduct.findById(id);

    return res.status(200).json(supplierProduct);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};


const listProductBySupplierId = async (req, res) => {
  try {
    const { id } = req.params;
    const supplierProduct = await SupplierProduct.find({ supplier: id }).populate('supplier').populate('product');;

    return res.status(200).json(supplierProduct);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }

};

const listSupplierByProductId = async (req, res) => {
  try {
    const { id } = req.params;
    const supplierProduct = await SupplierProduct.find({ product: id }).populate('supplier').populate('product');

    return res.status(200).json(supplierProduct);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }

};

const UpdateSupplierProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await SupplierProduct.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).send({ message: "SupplierProduct Not Found !" });
    }

    return res.status(200).send({ message: "SupplierProduct Updated Successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const UpdateSupplierProductPrice = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await SupplierProduct.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).send({ message: "SupplierProduct Not Find !" });
    }

    return res.status(200).send({ message: "SupplierProduct Updated Successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const DeleteSupplierProduct =  async (req,res) => {

  try{
      const {id} = req.params;
      const result = await SupplierProduct.findByIdAndDelete(id);

      if(!result){
          return res.status(404).send({ message: 'SupplierProduct Not Found !' });
      }

      return res.status(200).send({ message: 'SupplierProduct Deleted Successfully!' });


  } catch (error) {
      console.log(error.message);
      res.status(500).send({message: error.message});
  }

};

const SupplierPurchase = async (req, res, next) => {
  const { cart, total, amount, supplier } = req.body;

  const credit = total - amount;

  try {
    const latestPurchase = await Purchase.find().sort({ _id: -1 }).limit(1);
    let id;

    if (latestPurchase.length !== 0) {
      const latestId = parseInt(latestPurchase[0].ID.slice(2));
      id = "SP" + String(latestId + 1).padStart(4, "0");
    } else {
      id = "SP0001";
    }

    const date = new Date();

    const newPurchase = {
      ID: id,
      total: total,
      paidAmount: amount,
      date: date,
    };

    const purchase = await Purchase.create(newPurchase);

    const purchaseId = purchase._id;

    const itemsToAdd = cart.map(item => ({
      purchaseID: purchaseId,
      supplier_product: item.supplierProduct,
      Quantity: item.quantity,
    }));


    const addedItems = await SupplierProductPurchase.insertMany(itemsToAdd);


    const supplierInfo = await Supplier.findById(supplier);
    const currentCredit = supplierInfo.credit;

    const newCredit = currentCredit + credit;
    const result = await Supplier.findByIdAndUpdate(supplier, { credit: newCredit });

    res.status(200).json({ success: true, message: "Purchase and items added successfully" });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const listPurchase = async (req, res) => {
  try {
    const purchaseList = await Purchase.find({}).sort({ _id: -1 });

    return res.status(200).json(purchaseList);
    
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const listOnePurchasedetails =  async (req, res) => {
  try {
    const { id } = req.params;

    const supplierProduct = await SupplierProductPurchase.find({purchaseID : id}).populate('purchaseID').populate({
      path: 'supplier_product',
      populate: {
        path: 'supplier'
      }
    }).populate({
      path: 'supplier_product',
      populate: {
        path: 'product'
      }
    });

    return res.status(200).json(supplierProduct);
    

  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const confirmDelivery = async (req, res) => {
  try {
    const { id } = req.params;
    let qty, stock, newstock, product

    const result = await Purchase.findByIdAndUpdate(id, { status: 'Recieved' });

    const supplierProductPurchase = await SupplierProductPurchase.find({purchaseID : id}).populate('purchaseID').populate({
      path: 'supplier_product',
      populate: {
        path: 'supplier'
      }
    }).populate({
      path: 'supplier_product',
      populate: {
        path: 'product'
      }
    });

    for (const item of supplierProductPurchase) {
      product = item.supplier_product.product._id;
      stock = item.supplier_product.product.Stock;
      qty = item.Quantity;
      newstock = stock + qty;

      await Product.findByIdAndUpdate(product, { Stock: newstock });
    }

    date= new Date

    const costTable = supplierProductPurchase.map(item => ({
      productID: item.supplier_product.product.ID,
      productName: item.supplier_product.product.name,
      price: item.supplier_product.unitPrice,
      quantity: item.Quantity,
      inStock: item.Quantity,
      date: date,
    }));

    const costAdded = await Cost.insertMany(costTable);
    

    res.status(200).json({ success: true, message: "Purchase and items added successfully" });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const pendingOrderCount = async (req, res) => {
  try {
    const pending = await Purchase.find({ status: 'Pending' })

    const count = pending.length;
    
    return res.status(200).json(count);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }

};

const makeReport = async (req, res) => {
  try {
      const purchases = await Purchase.find({});
      const purchaseDataPromises = purchases.map(async (purchase) => {
          const supplierProductPurchase = await SupplierProductPurchase.findOne({ purchaseID: purchase._id }).populate({
              path: 'supplier_product',
              populate: {
                  path: 'supplier'
              }
          });
          if (supplierProductPurchase && supplierProductPurchase.supplier_product) {
              const supplierName = supplierProductPurchase.supplier_product.supplier.name;
              const supplierID = supplierProductPurchase.supplier_product.supplier.ID;
              return {
                  PurchaseID: purchase.ID,
                  SupplierID: supplierID,
                  SupplierName: supplierName,
                  Total: purchase.total,
                  Date: purchase.date
              };
          }
      });
      const purchaseData = await Promise.all(purchaseDataPromises);
      return res.status(200).json(purchaseData.filter(Boolean));
  } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
  }
};



exports.createSupplierProduct = createSupplierProduct;
exports.UpdateSupplierProduct = UpdateSupplierProduct;
exports.listProductBySupplierId = listProductBySupplierId;
exports.listSupplierByProductId = listSupplierByProductId;
exports.DeleteSupplierProduct = DeleteSupplierProduct;
exports.listSupplierProduct = listSupplierProduct;
exports.listSupplierProductById = listSupplierProductById;
exports.UpdateSupplierProductPrice = UpdateSupplierProductPrice;
exports.listProductsNotAssignedToSupplier = listProductsNotAssignedToSupplier;
exports.SupplierPurchase = SupplierPurchase;
exports.listPurchase = listPurchase;
exports.listOnePurchasedetails = listOnePurchasedetails;
exports.confirmDelivery = confirmDelivery;
exports.pendingOrderCount = pendingOrderCount;
exports.makeReport = makeReport;