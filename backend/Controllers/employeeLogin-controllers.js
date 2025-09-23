const HttpError = require("../Models/http-error.js");
const uuid = require("uuid");
const bcrypt = require("bcryptjs");
const Employeelogin = require("../Models/EmployeeLoginModel");

// get details from body and assigned to variables
const createEmployeeLogin = async (req, res, next) => {
  try {
    const { name, username, password } = req.body;
    // Default role to Admin for signup (form-based)
    const role = req.body.role || "Admin";

    // Prevent duplicate usernames (emails)
    const existing = await Employeelogin.findOne({ username });
    if (existing) {
      return res.status(409).json({ message: "Account already exists" });
    }

    const latestEmployee = await Employeelogin.find()
      .sort({ _id: -1 })
      .limit(1);
    let id;

    if (latestEmployee.length !== 0) {
      const latestId = parseInt(latestEmployee[0].ID.slice(1));
      id = "P" + String(latestId + 1).padStart(4, "0");
    } else {
      id = "P0001";
    }

    // Hash the password before storing
    const hashed = await bcrypt.hash(password, 12);

    const newEmployeeLogin = {
      ID: id,
      name: name,
      role: role,
      username: username,
      password: hashed,
    };

    // new employee is created
    const employee = await Employeelogin.create(newEmployeeLogin);
    return res.status(201).json({
      message: "Employee login created",
      employeeId: employee._id,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to create account" });
  }
};

// responding employees
const listEmployeeLogin = async (req, res) => {
  try {
    const employee = await Employeelogin.find({}, { password: 0 });
    return res.status(200).json(employee);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const UpdateEmployeeLogin = async (req, res) => {
  try {
    const { id } = req.params;
    const allowed = {};
    if (typeof req.body.name === "string") allowed.name = req.body.name;
    if (typeof req.body.username === "string")
      allowed.username = req.body.username;
    if (typeof req.body.role === "string") {
      const role = req.body.role;
      const allowedRoles = ["Admin", "Cashier"];
      if (allowedRoles.includes(role)) allowed.role = role;
    }
    if (
      typeof req.body.password === "string" &&
      req.body.password.trim().length > 0
    ) {
      allowed.password = await bcrypt.hash(req.body.password, 12);
    }

    // if username is changed, ensure uniqueness
    if (allowed.username) {
      const existing = await Employeelogin.findOne({
        username: allowed.username,
        _id: { $ne: id },
      });
      if (existing) {
        return res.status(409).json({ message: "Username already in use" });
      }
    }

    await Employeelogin.findByIdAndUpdate(id, { $set: allowed });

    return res.status(200).send({ message: "employee Updated Successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const listEmployeeLoginById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employeelogin.findById(id).select("-password");

    return res.status(200).json(employee);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const DeleteEmployeeLogin = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Employeelogin.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send({ message: "employee Not Find !" });
    }

    return res.status(200).send({ message: "employee Deleted Successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

exports.createEmployeeLogin = createEmployeeLogin;
exports.listEmployeeLogin = listEmployeeLogin;
exports.UpdateEmployeeLogin = UpdateEmployeeLogin;
exports.DeleteEmployeeLogin = DeleteEmployeeLogin;
exports.listEmployeeLoginById = listEmployeeLoginById;
