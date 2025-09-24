const dotenv = require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const ProductRoute = require("./Routes/ProductRoute");
const SupplierRoute = require("./Routes/SupplierRoute");
const SupplierProductRoute = require("./Routes/SupplierProductRoute");
const DeliveryRoute = require("./Routes/DeliveryRoute");
const EmployeeRoute = require("./Routes/EmployeeRoute");
const OffPay = require("./Routes/OfflinePaymentRoute");
const OnPay = require("./Routes/OnlinePayRoute");
const AttendanceRoute = require("./Routes/AttendanceRoute");
const cart = require("./Routes/CartRoute");
const CustomerRoute = require("./Routes/CustomerRoute");
const OrderRoute = require("./Routes/OrderRoute");
const LoginRoute = require("./Routes/LoginRoute");
const LogoutRoute = require("./Routes/LogoutRoute"); // Add the logout route
const NotificationRoute = require("./Routes/NotificationRoute");
const WholesalecustomerRoute = require("./Routes/WholesalecustomerRoute");
const SalaryRoute = require("./Routes/SalaryRoute");
const PaymentRoute = require("./Routes/PaymentRoute");
const ProductReviewRoute = require("./Routes/ProductReviewRoute");
const FaqRoute = require("./Routes/FaqRoute");
const InquiryRoute = require("./Routes/InquiryRoute");
const app = express();

// Security Middleware
const sanitize = require("./middleware/sanitize"); // Request sanitizer for NoSQL injection protection
const mongoSanitize = require("./middleware/mongoSanitize"); // MongoDB query sanitization utilities
const { apiRateLimiter } = require("./utils/rateLimiter");

// Routes
const DeliveryLoginRoute = require("./Routes/DeliveryLoginRoute");
const DeliveryPersonLoginRoute = require("./Routes/DeliveryLoginpRoute");
const ProfitRoute = require("./Routes/ProfitRoute");
const AvailableRoute = require("./Routes/AvailableRoute");
const salaryHistory = require("./Routes/salaryHistoryRoute");
const DeliveryOrderRoute = require("./Routes/AssignRoute");
const EmployeeLoginRoute = require("./Routes/EmployeeLoginRoute");
const EmployeePersonLoginRoute = require("./Routes/EmployeeloginPersonRoute");
const InvoiceRoute = require("./Routes/InvoiceRoute");
const EmployeeGoogleAuthRoute = require("./Routes/EmployeeGoogleAuthRoute");
const EmployeeGoogleSignupRoute = require("./Routes/EmployeeGoogleSignupRoute");
const CustomerGoogleAuthRoute = require("./Routes/CustomerGoogleAuthRoute");
const CustomerGoogleSignupRoute = require("./Routes/CustomerGoogleSignupRoute");

// Middleware Configuration
app.use(express.json({ limit: "1mb" })); // Limit payload size
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "1mb" }));
app.use(cookieParser());

// MongoDB NoSQL Injection Protection - Apply sanitize middleware to all requests
app.use(sanitize); // Sanitizes req.body, req.query, and req.params

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Import and apply API rate limiter to all routes
app.use(apiRateLimiter);

// Add security headers
app.use((req, res, next) => {
  // Prevent clickjacking
  res.setHeader("X-Frame-Options", "DENY");

  // Enable XSS protection in browsers
  res.setHeader("X-XSS-Protection", "1; mode=block");

  // Prevent MIME type sniffing
  res.setHeader("X-Content-Type-Options", "nosniff");

  // Strict Content Security Policy
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'"
  );

  next();
});

app.use("/product", ProductRoute);
app.use("/customer", CustomerRoute);
app.use("/supplier", SupplierRoute);
app.use("/employee", EmployeeRoute);
app.use("/supplierproduct", SupplierProductRoute);
app.use("/attendance", AttendanceRoute);
app.use("/delivery", DeliveryRoute);
app.use("/cart", cart);
app.use("/OffPay", OffPay);
app.use("/OnPay", OnPay);
app.use("/Login", LoginRoute);
app.use("/logout", LogoutRoute);
app.use("/order", OrderRoute);
app.use("/salary", SalaryRoute);
app.use("/notify", NotificationRoute);
app.use("/wholesalecustomer", WholesalecustomerRoute);
app.use("/faq", FaqRoute);
app.use("/inquiry", InquiryRoute);
app.use("/Payment", PaymentRoute);
app.use("/uploads/images", express.static(path.join("uploads", "images")));
app.use("/ProductReview", ProductReviewRoute);
app.use("/deliverylogin", DeliveryLoginRoute);
app.use("/deliveryCheckLogin", DeliveryPersonLoginRoute);
app.use("/profit", ProfitRoute);
app.use("/available", AvailableRoute);
app.use("/salaryHistory", salaryHistory);
app.use("/EmployeeLogin", EmployeeLoginRoute);
app.use("/deliveryOrder", DeliveryOrderRoute);
app.use("/EmployeeChecklogin", EmployeePersonLoginRoute);
app.use("/Invoice", InvoiceRoute);
app.use("/auth/google/employee", EmployeeGoogleAuthRoute);
app.use("/auth/google/employee/signup", EmployeeGoogleSignupRoute);
app.use("/auth/google/customer", CustomerGoogleAuthRoute);
app.use("/auth/google/customer/signup", CustomerGoogleSignupRoute);

const PORT = process.env.PORT || 5000;

// Configure Mongoose to use strict query mode (prevents some NoSQL injection vectors)
mongoose.set("strictQuery", true);

// Configure MongoDB connection with enhanced security options
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
};

// Global error handler (should be after all routes and before DB connect)
app.use((err, req, res, next) => {
  console.error(err.stack || err.message || err);
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  }
  res.status(400).json({ message: err.message || "Invalid request" });
});

// Connect to MongoDB with security options
mongoose
  .connect(process.env.MONGO_URL, mongoOptions)
  .then(() => {
    console.log("MongoDB connected with NoSQL injection protections");
    app.listen(PORT, () => console.log(`Server running on port ${PORT} 🔥`));
  })
  .catch((err) => console.log("MongoDB connection error:", err));
