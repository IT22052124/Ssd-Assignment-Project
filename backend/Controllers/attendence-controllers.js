const EmployeeAttendance = require("../Models/AttendenceModel");
const HttpError = require("../Models/http-error.js");
const uuid = require("uuid");

const markAttendance = async (req, res) => {
  const { employee } = req.body;

  try {
    for (const item of employee) {
      const existingAttendance = await EmployeeAttendance.findOneAndUpdate(
        { employee: item.employee, date: item.date },
        { status: item.status },
        { new: true }
      );

      if (!existingAttendance) {
        await EmployeeAttendance.create({
          employee: item.employee,
          date: item.date,
          status: item.status
        });
      }
    }

    res.status(201).send('Attendance marked successfully');
  } catch (error) {
    console.error('Error marking attendance:', error);
    res.status(500).send('Failed to mark attendance');
  }
};

const listAttendance = async (req, res) => {
  try {
    const attendance = await EmployeeAttendance.find({})
      .populate('employee')
      .sort({ _id: -1 });
    
    return res.status(200).json(attendance);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

exports.markAttendance = markAttendance;
exports.listAttendance = listAttendance;
