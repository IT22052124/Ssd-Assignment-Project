const HttpError = require("../Models/http-error");
const uuid = require("uuid");
const Inquiry = require("../Models/InquiryModel");

// get details from body and assigned to variables
const createInquiry = async (req, res, next) => {
  const { subject, description, type, telephone, name ,mail} = req.body;

  const latestInquiry = await Inquiry.find().sort({ _id: -1 }).limit(1);
  let id;

  if (latestInquiry.length !== 0) {
    const latestId = parseInt(latestInquiry[0].ID.slice(1));
    id = "I" + String(latestId + 1).padStart(4, "0");
  } else {
    id = "I0001";
  }

  const newInquiry = {
    ID: id,
    subject: subject,
    description: description,
    type: type,
    telephone: telephone,
    name:name,
    mail:mail,
  };

  // New FAQ is created
  const inquiry = await Inquiry.create(newInquiry);
  return res.status(201).send(inquiry);
};
// responding wholesalecustomers
const listInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.find({});
    return res.status(200).json(inquiry);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};
const listInquiryById = async (req, res) => {
  try {
    const { id } = req.params;
    const inquiry = await Inquiry.findById(id);

    return res.status(200).json(inquiry);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const UpdateInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Inquiry.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).send({ message: "FAQ Not Find !" });
    }

    return res.status(200).send({ message: "FAQ Updated Successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const DeleteInquiry =  async (req,res) => {

  try{
      const {id} = req.params;
      const result = await Inquiry.findByIdAndDelete(id);

      if(!result){
          return res.status(404).send({ message: 'FAQ Not Find !' });
      }

      return res.status(200).send({ message: 'FAQ Deleted Successfully!' });


  } catch (error) {
      console.log(error.message);
      res.status(500).send({message: error.message});
  }

};

exports.createInquiry = createInquiry;
exports.listInquiry = listInquiry;
exports.UpdateInquiry = UpdateInquiry;
exports.listInquiryById = listInquiryById;
exports.DeleteInquiry = DeleteInquiry;
