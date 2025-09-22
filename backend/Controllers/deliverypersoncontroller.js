const HttpError = require("../Models/http-error");
const DeliveryPerson = require("../Models/DeliveryLogin");

const DeliveryPersonLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const deliveryPerson = await DeliveryPerson.findOne({ username: username }).populate("delivery")
        if (deliveryPerson && deliveryPerson.password === password) {
            res.json({
                message: 'Success',
                delivery: deliveryPerson.delivery._id
            });
        } else {
            res.status(401).json("Invalid username/password");
        }
    } catch (err) {
        console.error(err);
        res.status(500).json("Unable to process request, please try again later");
    }
}

exports.DeliveryPersonLogin = DeliveryPersonLogin;
