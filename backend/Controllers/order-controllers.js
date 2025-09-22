const Order = require("../Models/OrderModel");
const Cost = require("../Models/CostModel");
const Profit = require("../Models/ProfitModel");
const Product = require("../Models/ProductModel");
const Notification = require("./notification-controllers");

createOrder = async (req, res) => {
  try {
    const { cartitem, uid } = req.body;

    console.log(cartitem)

    const latestOrder = await Order.find().sort({ _id: -1 }).limit(1);
    let id;
    console.log(uid);
    if (latestOrder.length !== 0) {
      const latestId = parseInt(latestOrder[0].orderId.slice(1));
      id = "O" + String(latestId + 1).padStart(4, "0");
    } else {
      id = "O0001";
    }

    const items = await Promise.all(
      cartitem.map(async (item) => {
        await Product.findByIdAndUpdate(item.product._id, {
          $inc: { Stock: -item.quantity },
        });

      return {
        productId: item.product._id,
        quantity: item.quantity,
      };
    }));



    const date = new Date();

    console.log(date)
// Get Sri Lanka time zone offset in milliseconds


// Calculate Sri Lanka time


// Extract time components
const sriLankaHours = date.getHours();
const sriLankaMinutes = date.getMinutes();
const sriLankaSeconds = date.getSeconds();

console.log(sriLankaHours, sriLankaMinutes);

// Extract date components
const sriLankaYear = date.getFullYear();
const sriLankaMonth = date.getMonth() + 1; // Month is zero-indexed, so add 1
const sriLankaDay = date.getDate();

// Adjust time if it's a single digit
const adjustedSriLankaHours = sriLankaHours < 10 ? '0' + sriLankaHours : sriLankaHours;
const adjustedSriLankaMinutes = sriLankaMinutes < 10 ? '0' + sriLankaMinutes : sriLankaMinutes;
const adjustedSriLankaSeconds = sriLankaSeconds < 10 ? '0' + sriLankaSeconds : sriLankaSeconds;

// Assign to two separate variables
const sriLankaTimeStr = `${adjustedSriLankaHours}:${adjustedSriLankaMinutes}:${adjustedSriLankaSeconds}`;
const sriLankaDateStr = `${sriLankaYear}-${sriLankaMonth}-${sriLankaDay}`;

    const profitTable = await Promise.all(
      cartitem.map(async (item) => {
        let cost = await Cost.findOne({
          productID: item.product.ID,
          inStock: { $ne: 0 },
        }).limit(1);

        let buyqtytemp = item.quantity;
        let costStock = cost.inStock;
        let sellPrice = item.product.price;
        let profit = 0;

        while (buyqtytemp > costStock) {
          profit = profit + (sellPrice - cost.price) * cost.inStock;
          buyqtytemp = buyqtytemp - cost.inStock;
          const result = await Cost.findByIdAndUpdate(cost._id, { inStock: 0 });
          cost = await Cost.findOne({
            productID: item.product.ID,
            inStock: { $ne: 0 },
          }).limit(1);
          costStock = cost.inStock;
        }

        profit = profit + (sellPrice - cost.price) * buyqtytemp;
        const result = await Cost.findByIdAndUpdate(cost._id, {
          $inc: { inStock: -buyqtytemp },
        });

        return {
          order: id,
          productID: item.product.ID,
          productName: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          profit: profit,
          type: "Online",
          date: date,
        };
      })
    );

    const profitAdded = await Profit.insertMany(profitTable);

    const newOrder = {
      orderId: id,
      userId: uid,
      CartItems: items,
      date:sriLankaDateStr,
      time:sriLankaTimeStr
    };

    const order = await Order.create(newOrder);
    for (let item of cartitem) {
      await Notification.createNotification({ body: { productId: item.product._id } }, null , null);
    }
    // Respond with a success message
    res.status(201).json({ message: "Order placed successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const latestOrder = async (req, res) => {
  try {
    const { userId } = req.params;
    const latestOrder = await Order.find({ userId: userId }).sort({ createdAt: -1 }).limit(1);
    res.status(200).json(latestOrder);
  } catch (error) {
    console.error("Error fetching latest order:", error);
    res.status(500).json({ message: 'Failed to fetch latest order', error });
  }
};

const listOrder = async (req, res) => {
  try {
    const order = await Order.find({})
      .populate("userId")
      .populate("CartItems.productId")
      .sort({ createdAt: -1 });

    return res.status(200).json(order);
  } 
  catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const listOrders = async (req, res) => {
  try {
    const order = await Order.find({})
    .populate("CartItems.productId");

    return res.status(200).json(order);
  } 
  catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const listOrderById = async (req, res) => {
  try {
    const {uid}= req.params;
    const order = await Order.find({userId:uid})
    .populate("CartItems.productId")
    .sort({ createdAt: -1 });

    return res.status(200).json(order);
  } 
  catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const GetProductReportByDateRange = async (req, res) => {
  try {
    const startDate = new Date(req.query.startDate);
    const endDate = new Date(req.query.endDate);

    console.log(startDate,endDate)
    const orders = await Order.find({
      createdAt: { $gte: startDate, $lte: endDate },
    })
    .populate("CartItems.productId");

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const checkOrder = async (req, res) => {
  try {
    const { pid, uid } = req.params;
    const orders = await Order.find({
      userId: uid,
      CartItems: {
        $elemMatch: {
          productId: pid,
        },
      },
    });
    if (orders.length > 0) {
      res.status(200).send({ check: true });
    } else {
      res.status(200).send({ check: false });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};


exports.createOrder = createOrder;
exports.listOrder = listOrder;
exports.checkOrder = checkOrder;
exports.listOrders = listOrders;
exports.GetProductReportByDateRange = GetProductReportByDateRange;
exports.listOrderById = listOrderById;
exports.latestOrder=latestOrder;