const ProductReviews = require("../Models/ProductReview");

const createProductReview = async (req, res, next) => {
  const { userID, Productid, rating, message } = req.body;

  const latestProduct = await ProductReviews.find().sort({ _id: -1 }).limit(1);
  let id;
  if (latestProduct.length !== 0) {
    const latestId = parseInt(latestProduct[0].PRid.slice(1));
    id = "R" + String(latestId + 1).padStart(4, "0");
  } else {
    id = "R0001";
  }

  const newProductR = {
    PRid: id,
    UserID: userID,
    ProductID: Productid,
    Rating: rating,
    Message: message,
  };

  const ProductReview = await ProductReviews.create(newProductR);
  return res.status(201).send(ProductReview);
};

const listProductReviewsByID = async (req, res) => {
  try {
    const { pid } = req.params;
    const ProductReview = await ProductReviews.find({ ProductID: pid })
      .populate("UserID")
      .sort({ createdAt: -1 });
    return res.status(200).json(ProductReview);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const listProductReviews = async (req, res) => {
  try {
    const ProductReview = await ProductReviews.find({})
      .populate("UserID")
      .populate("ProductID")
      .sort({ createdAt: -1 });
    return res.status(200).json(ProductReview);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const DeleteProductReviewByUser = async (req, res) => {
  try {
    const {id} = req.params
    const result = await ProductReviews.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({ message: "Product Review Not Find !" });
    }

    return res.status(200).send({ message: "Product Review Deleted Successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

exports.createProductReview = createProductReview;
exports.listProductReviewsByID = listProductReviewsByID;
exports.listProductReviews = listProductReviews;
exports.DeleteProductReviewByUser = DeleteProductReviewByUser