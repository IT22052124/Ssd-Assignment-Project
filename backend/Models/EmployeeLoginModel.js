const mongoose = require("mongoose");

const EmployeeLoginSchema = mongoose.Schema(
  {
    ID:{
      type:String,
      required:true,
    },
   
    name: {
      type: String,
      required:false,
      trim: true,
    },
    role:{
      type: String,
      required: true,

    }
    ,
    username: {
      type: String,
      required: true,
      trim:true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    
   
  },
  {
    timestamps: true,
  }
);

const employee = mongoose.model("EmployeeLogin",EmployeeLoginSchema);
module.exports = employee;
