const Salary = require("../Models/HistorySalary");
const HttpError = require("../Models/http-error");


const createSalary = async (req, res, next) => {
    const { employee, date, status ,net} = req.body;
  
    
  
    const newSalary = {
        employee: employee,
        date: date,
        status: status,
        net:net,
    };
  
    const salaryy = await Salary.create(newSalary);
    return res.status(201).send(salaryy);
}


 const listSalary = async (req, res) => {
    try {
      const salary = await Salary.find({})
      .populate('employee')
      .sort({ _id: -1 });
  
      return res.status(200).json(salary);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  
  };

  
exports.createSalaryHistory = createSalary;
exports.listSalaryHistory = listSalary;