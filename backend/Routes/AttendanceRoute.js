const express = require("express");
const AttendanceControllers = require("../Controllers/attendence-controllers");
const Router = express.Router();

Router.post("/mark", AttendanceControllers.markAttendance);
Router.get("/attendancelist", AttendanceControllers.listAttendance);
Router.get("/", AttendanceControllers.listAttendance);

module.exports = Router;

