const HttpError = require("../Models/http-error");
const Customer = require("../Models/CustomerModel");
const uuid = require("uuid");

const CustomerLogin = async (req,res) => {
    const {mail, password} = req.body;
    Customer.findOne({mail:mail})
    .then(user =>{
      if(user) {
        if(user.password === password) {
          res.json({
            message: 'Success',
            user: user
          })
        } else{
          res.json("The password is incorrect")
        }
      } else {
        res.json("No record exsisted")
      }
    })
}

exports.CustomerLogin = CustomerLogin;