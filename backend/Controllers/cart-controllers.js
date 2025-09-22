// cartController.js

const Cart = require("../Models/CartModel"); // Path to your Cart model

// Create a new cart
const createCart = async (req, res) => {
  const { user, product, quantity } = req.body;

  const newCart = {
    user: user,
    product: product,
    quantity: quantity,
  };

  try {
    const cart = await Cart.create(newCart);
    return res.status(201).send(cart);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

// List all carts
const listCart = async (req, res) => {
  try {
    const cart = await Cart.find({}).populate("user").populate("product");
    return res.status(200).json(cart);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

// List cart by user ID
const listCartByUId = async (req, res) => {
  const {id} = req.params;

  try {
    const cart = await Cart.find({ user: id }).populate("product");

    

    return res.status(200).json(cart);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

// Update a cart
const updateCart = async (req, res) => {
  const { id } = req.params;

  try {
    const cartItem = await Cart.findByIdAndUpdate(id, req.body);

    if (!cartItem) {
      return res.status(404).send({ message: "Cart item not found!" });
    }

    // Update the cart item with new info from req.body
    return res
      .status(200)
      .send({ message: "Cart updated successfully!", cartItem });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

// Delete a cart
const deleteCart = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Cart.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({ message: "Cart Not Found !" });
    }
    return res.status(200).send({ message: "Item Deleted Successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const listCartById = async (req, res) => {
  const {id} = req.params;

  try {
    
    const cart = await Cart.findById({ id }).populate("product");
n

    

    return res.status(200).json(cart);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const getCartItems= async (req, res) => {
  try {
    const { id } = req.query; // Assuming id is passed as an array of strings
    const items = await Cart.find({ _id: { $in: id } }).populate("user").populate("product"); // Use $in operator to find multiple IDs
    res.json(items);
  } catch (error) {
    console.error("Error fetching item details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.createCart = createCart;
exports.updateCart = updateCart;
exports.deleteCart = deleteCart;
exports.listCartByUId = listCartByUId;
exports.listCart = listCart;
exports.listCartById = listCartById;
exports.getCartItems=getCartItems;
