const Notification = require("../Models/Notification");
const Product = require("../Models/ProductModel");


const createNotification = async (req, res, next) => {
  try {
  const { productId } = req.body;

    const product = await Product.findById(productId);
    console.log(product)
    if (!product) {
      return null
    }

    if (product.Stock < product.Alert_quantity) {
      const newNotification = {
        Product: product._id
      };

      await Notification.create(newNotification);
      return null
    } else {
      return null
    }
  } catch (error) {
    return null
  }
};

const listNotification = async (req, res) => {
  try {
    const notifications = await Notification.find({}).populate("Product").sort({ createdAt: -1 });
    return res.status(200).json(notifications);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const seenNotification = async (req, res) => {
  try {

    const result = await Notification.updateMany({}, { seen: "Yes" });

    if (result.nModified === 0) {
      return res.status(404).send({ message: "No notifications found!" });
    }

    return res.status(200).send({ message: "All notifications marked as seen successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const readNotification = async (req, res) => {
  try {
    
    const result = await Notification.findByIdAndUpdate(req.body.id , { read: "Yes" });

    if (result.nModified === 0) {
      return res.status(404).send({ message: "No notifications found!" });
    }

    return res.status(200).send({ message: "read notification success!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const DeleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Notification.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send({ message: "Notification Not Find !" });
    }

    return res
      .status(200)
      .send({ message: "Notification Deleted Successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

exports.createNotification = createNotification;
exports.listNotification = listNotification;
exports.DeleteNotification = DeleteNotification;
exports.seenNotification = seenNotification
exports.readNotification = readNotification
