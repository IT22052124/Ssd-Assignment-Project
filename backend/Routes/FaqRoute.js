const express = require("express");
const Faq = require("../Controllers/Faq-controller");
const Router = express.Router();

Router.post("/new",Faq.createFaq);
Router.get("/", Faq.listFaq);
Router.delete("/:id", Faq.DeleteFaq);
Router.get("/:id", Faq.listFaqById);
Router.put("/:id", Faq.UpdateFaq);

module.exports = Router;
