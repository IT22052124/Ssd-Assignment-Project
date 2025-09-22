const HttpError = require("../Models/http-error.js");
const uuid = require("uuid");
const Employeelogin = require("../Models/EmployeeLoginModel");


// get details from body and assigned to variables
const createEmployeeLogin= async (req, res, next) => {
  const { name, username,role,password } = req.body;

  const latestEmployee = await Employeelogin.find().sort({ _id: -1 }).limit(1);
  let id;

  if (latestEmployee.length !== 0) {
    const latestId = parseInt(latestEmployee[0].ID.slice(1));
    id = "P" + String(latestId + 1).padStart(4, "0");
  } else {
    id = "P0001";
  }



  const newEmployeeLogin = {
    ID: id,
    name: name,
    role:role,
    username: username,
    password: password,
    
  };

  // new employee is created
  const employee = await Employeelogin.create(newEmployeeLogin);
  return res.status(201).send(employee);
};

// responding employees
const listEmployeeLogin = async (req, res) => {
  try {
    const employee = await Employeelogin.find({});
    return res.status(200).json(employee);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};


const UpdateEmployeeLogin = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Employeelogin.findByIdAndUpdate(id, req.body);

    
    return res.status(200).send({ message: "employee Updated Successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const listEmployeeLoginById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employeelogin.findById(id);

    return res.status(200).json(employee);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const DeleteEmployeeLogin =  async (req,res) => {

  try{
      const {id} = req.params;
      
      const result = await Employeelogin.findByIdAndDelete(id);

      if(!result){
          return res.status(404).send({ message: 'employee Not Find !' });
      }

      return res.status(200).send({ message: 'employee Deleted Successfully!' });


  } catch (error) {
      console.log(error.message);
      res.status(500).send({message: error.message});
  }

};


exports.createEmployeeLogin = createEmployeeLogin;
exports.listEmployeeLogin = listEmployeeLogin;
exports.UpdateEmployeeLogin = UpdateEmployeeLogin;
exports.DeleteEmployeeLogin = DeleteEmployeeLogin;
exports.listEmployeeLoginById = listEmployeeLoginById;