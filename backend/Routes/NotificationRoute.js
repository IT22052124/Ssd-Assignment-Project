const express = require("express");
const NotificationControllers = require("../Controllers/notification-controllers");
const Router = express.Router();

Router.post("/create",  NotificationControllers.createNotification);
Router.get("/", NotificationControllers.listNotification);
Router.delete("/:id", NotificationControllers.DeleteNotification);
Router.put('/mark-as-seen', NotificationControllers.seenNotification);
Router.put('/mark-as-read', NotificationControllers.readNotification);

module.exports = Router;
