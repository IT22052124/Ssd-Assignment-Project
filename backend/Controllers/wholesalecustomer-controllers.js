const HttpError = require("../Models/http-error");
const uuid = require("uuid");
const Wholesalecustomer = require("../Models/WholesalecustomerModel");

// get details from body and assigned to variables
const createWholesalecustomer = async (req, res, next) => {
  const { name, address, telephone, email, creditlimit, credit } = req.body;

  const latestWholesalecustomer = await Wholesalecustomer.find().sort({ _id: -1 }).limit(1);
  let id;

  if (latestWholesalecustomer.length !== 0) {
    const latestId = parseInt(latestWholesalecustomer[0].ID.slice(1));
    id = "W" + String(latestId + 1).padStart(4, "0");
  } else {
    id = "W0001";
  }


  const newWholesalecustomer = {
    ID: id,
    name: name,
    address: address,
    telephone: telephone,
    email: email,
    creditlimit: creditlimit,
    credit: credit,
  };

// new wholesalecustomer is created
  const wholesalecustomer = await Wholesalecustomer.create(newWholesalecustomer);
  return res.status(201).send(wholesalecustomer);
};

// responding wholesalecustomers
const listWholesalecustomer = async (req, res) => {
  try {
    const wholesalecustomer = await Wholesalecustomer.find({});
    return res.status(200).json(wholesalecustomer);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};
const listWholesalecustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const wholesalecustomer = await Wholesalecustomer.findById(id);

    return res.status(200).json(wholesalecustomer);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const UpdateWholesalecustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Wholesalecustomer.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).send({ message: "wholesalecustomer Not Find !" });
    }

    return res.status(200).send({ message: "wholesalecustomer Updated Successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const DeleteWholesalecustomer =  async (req,res) => {

  try{
      const {id} = req.params;
      const result = await Wholesalecustomer.findByIdAndDelete(id);

      if(!result){
          return res.status(404).send({ message: 'wholesalecustomer Not Find !' });
      }

      return res.status(200).send({ message: 'wholesalecustomer Deleted Successfully!' });


  } catch (error) {
      console.log(error.message);
      res.status(500).send({message: error.message});
  }

};

exports.createWholesalecustomer = createWholesalecustomer;
exports.listWholesalecustomer = listWholesalecustomer;
exports.UpdateWholesalecustomer = UpdateWholesalecustomer;
exports.listWholesalecustomerById = listWholesalecustomerById;
exports.DeleteWholesalecustomer = DeleteWholesalecustomer;
