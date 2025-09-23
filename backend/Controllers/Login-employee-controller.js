const HttpError = require("../Models/http-error");
const bcrypt = require("bcryptjs");
const EmployeeLoginModel = require("../Models/EmployeeLoginModel");

const EmployeeLogin = async (req, res) => {
  const { username, password } = req.body;
  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    !username.trim() ||
    !password.trim()
  ) {
    return res.status(400).json("Username and password are required");
  }
  try {
    const employee = await EmployeeLoginModel.findOne({ username: username });
    let passOk = false;
    if (employee) {
      try {
        passOk = await bcrypt.compare(password, employee.password);
      } catch (e) {
        passOk = false;
      }
    }
    if (employee && passOk) {
      console.log(employee.role);
      if (employee.role === "Cashier") {
        res.json({
          message: "cashier",
          employeeId: employee._id,
          avatarUrl: employee.avatarUrl || null,
        });
      } else {
        res.json({
          message: "admin",
          employeeId: employee._id,
          avatarUrl: employee.avatarUrl || null,
        });
      }
    } else {
      res.status(401).json("Invalid username/password");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Unable to process request, please try again later");
  }
};

exports.EmployeeLogin = EmployeeLogin;
