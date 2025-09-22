const HttpError = require("../Models/http-error.js");
const uuid = require("uuid");
const Employee = require("../Models/EmployeeModel");


// get details from body and assigned to variables
const createEmployee = async (req, res, next) => {
  const { name, address, telephone, mail, type, hourlywage } = req.body;

  const latestEmployee = await Employee.find().sort({ _id: -1 }).limit(1);
  let id;

  if (latestEmployee.length !== 0) {
    const latestId = parseInt(latestEmployee[0].ID.slice(1));
    id = "E" + String(latestId + 1).padStart(4, "0");
  } else {
    id = "E0001";
  }


  const newEmployee = {
    ID: id,
    name: name,
    address: address,
    telephone: telephone,
    mail: mail,
    type: type,
    hourlywage: hourlywage,
  };

  // new employee is created
  const employee = await Employee.create(newEmployee);
  return res.status(201).send(employee);
};

// responding employees
const listEmployee = async (req, res) => {
  try {
    const employee = await Employee.find({});
    return res.status(200).json(employee);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};
const listEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);

    return res.status(200).json(employee);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const UpdateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Employee.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).send({ message: "employee Not Find !" });
    }

    return res.status(200).send({ message: "employee Updated Successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const DeleteEmployee =  async (req,res) => {

  try{
      const {id} = req.params;
      const emoloyee = await Employee.findById(id);
      const result = await Employee.findByIdAndDelete(id);

      if(!result){
          return res.status(404).send({ message: 'employee Not Find !' });
      }

      return res.status(200).send({ message: 'employee Deleted Successfully!' });


  } catch (error) {
      console.log(error.message);
      res.status(500).send({message: error.message});
  }

};
const getIds =  async (req, res) => {
  try {
    const employees = await Employee.find({}, 'ID');
    const employeeIds = employees.map(employee => employee.ID);
    res.json(employeeIds);
  } catch (error) {
    console.error('Error fetching employee IDs:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};


exports.createEmployee = createEmployee;
exports.listEmployee = listEmployee;
exports.UpdateEmployee = UpdateEmployee;
exports.listEmployeeById = listEmployeeById;
exports.DeleteEmployee = DeleteEmployee;
exports.getIds =getIds;
