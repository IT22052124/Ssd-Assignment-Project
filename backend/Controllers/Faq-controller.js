const HttpError = require("../Models/http-error");
const uuid = require("uuid");
const Faq = require("../Models/FaqModel");

// get details from body and assigned to variables
const createFaq = async (req, res, next) => {
  const { issue, solution, category, aurthor } = req.body;

  console.log(issue)

  const latestFaq = await Faq.find().sort({ _id: -1 }).limit(1);
  let id;

  if (latestFaq.length !== 0) {
    const latestId = parseInt(latestFaq[0].ID.slice(1));
    id = "F" + String(latestId + 1).padStart(4, "0");
  } else {
    id = "F0001";
  }

  const newFaq = {
    ID: id,
    issue: issue,
    solution: solution,
    category: category,
    aurthor: aurthor,
  };

  // New FAQ is created
  const faq = await Faq.create(newFaq);
  return res.status(201).send(faq);
};
// responding wholesalecustomers
const listFaq = async (req, res) => {
  try {
    const faq = await Faq.find({});
    return res.status(200).json(faq);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};
const listFaqById = async (req, res) => {
  try {
    const { id } = req.params;
    const faq = await Faq.findById(id);

    return res.status(200).json(faq);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const UpdateFaq = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Faq.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).send({ message: "FAQ Not Find !" });
    }

    return res.status(200).send({ message: "FAQ Updated Successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};


const DeleteFaq =  async (req,res) => {

  try{
      const {id} = req.params;
      const result = await Faq.findByIdAndDelete(id);

      if(!result){
          return res.status(404).send({ message: 'FAQ Not Find !' });
      }

      return res.status(200).send({ message: 'FAQ Deleted Successfully!' });


  } catch (error) {
      console.log(error.message);
      res.status(500).send({message: error.message});
  }

};

exports.createFaq = createFaq;
exports.listFaq = listFaq;
exports.UpdateFaq = UpdateFaq;
exports.listFaqById = listFaqById;
exports.DeleteFaq = DeleteFaq;
