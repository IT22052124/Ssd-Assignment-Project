const express = require("express");
const Inquiry = require("../Controllers/Inquiry-controller");
const Router = express.Router();

Router.post("/new",Inquiry.createInquiry);
Router.get("/", Inquiry.listInquiry);
Router.delete("/:id", Inquiry.DeleteInquiry);
Router.get("/:id", Inquiry.listInquiryById);
Router.put("/:id", Inquiry.UpdateInquiry);

module.exports = Router;