const HttpError = require("../Models/http-error");
const Delivery  = require("../Models/DeliveryModel");
const uuid = require("uuid");
const fs = require("fs");

const createDelivery = async (req, res, next) => {
  const { name, telephone, mail, address , city , license, numberplate , type , capacity } = req.body;

  const latestDelivery= await Delivery.find().sort({ _id: -1 }).limit(1);
  let id;


  if (latestDelivery.length !==0) {
    const latestId = parseInt(latestDelivery[0].ID.slice(1)); 
    id = "D" + String(latestId + 1).padStart(4, "0"); 
  } else {
    id = "D0001"; 
  }
  
  let path = 'uploads/images/No-Image-Placeholder.png' 
  if(req.file && req.file.path )
    path = req.file.path

  const newDelivery = {
    ID: id,
    name: name,
    telephone: telephone,
    mail: mail,
    address: address,
    city: city,
    license: license,
    numberplate: numberplate,
    type: type,
    capacity: capacity,
    image: path,
  };

  const delivery = await Delivery.create(newDelivery);
  return res.status(201).send(delivery);
};

const listDelivery= async (req, res) => {
  try {
    const delivery = await Delivery.find({});
    return res.status(200).json(delivery);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};
const listDeliveryById = async (req, res) => {
  try {
    const { id } = req.params;
    const delivery = await Delivery.findById(id);

    return res.status(200).json(delivery);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const UpdateDelivery= async (req, res) => {
  try {
    const { id } = req.params;

    const delivery = await Delivery.findById(id);

    const path = delivery.image;
    if (path !== "uploads/images/No-Image-Placeholder.png") {
      fs.unlink(path, (err) => {
        console.log(err);
      });
    }

    const { name, telephone, mail, address , city , license, numberplate , type , capacity } = req.body;

    let path2 = "uploads/images/No-Image-Placeholder.png";
    if (req.file && req.file.path) path2 = req.file.path;

    const Updatedelivery = {
      name: name,
      telephone: telephone,
      mail: mail,
      address: address,
      city: city,
      license: license,
      numberplate: numberplate,
      type: type,
      capacity: capacity,
      image: path2,
    };
  
    const result = await Delivery.findByIdAndUpdate(id, Updatedelivery);

    if (!result) {
      return res.status(404).send({ message: "Delivery Person Not Found !" });
    }

    return res.status(200).send({ message: "Delivery Person Updated Successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const DeleteDelivery=  async (req,res) => {

  try{
      const {id} = req.params;
      const delivery = await Delivery.findById(id);

      const path = delivery.image;

      if(typeof path === 'string' && path !== 'uploads/images/No-Image-Placeholder.png'){
        fs.unlink(path, err => {
          console.log(err)
        })
      }
      
      const result = await Delivery.findByIdAndDelete(id);

      if(!result){
          return res.status(404).send({ message: 'Delivery Person Not Found !' });
      }

      return res.status(200).send({ message: 'Delivery Person Deleted Successfully!' });


  } catch (error) {
      console.log(error.message);
      res.status(500).send({message: error.message});
  }

};

exports.createDelivery = createDelivery;
exports.listDelivery = listDelivery;
exports.UpdateDelivery = UpdateDelivery;
exports.listDeliveryById = listDeliveryById;
exports.DeleteDelivery = DeleteDelivery;
