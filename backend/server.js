const dotenv = require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
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
const NotificationRoute = require("./Routes/NotificationRoute");
const WholesalecustomerRoute = require("./Routes/WholesalecustomerRoute");
const SalaryRoute = require("./Routes/SalaryRoute");
const PaymentRoute = require("./Routes/PaymentRoute");
const ProductReviewRoute = require("./Routes/ProductReviewRoute");
const FaqRoute = require("./Routes/FaqRoute");
const InquiryRoute = require("./Routes/InquiryRoute");
const app = express();
const sanitize = require("./middleware/sanitize");
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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(sanitize);
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

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
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT} 🔥`));
  })
  .catch((err) => console.log(err));
