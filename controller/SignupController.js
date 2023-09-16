const userModel = require('../model/User');
const {validationResult} = require("../validators/SignupValidation");

async function register(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        const data = new userModel(req.body);
        const checkEmail = await userModel.find({email: req.body.email});
        if (checkEmail) {
            res.status(500).json({
                message: "Looks like this email is already registered"
            })
        } else {
            await data.save();
            res.json({
                message: "Registered successfully"
            });
        }
    } else {
        res.status(500).send(errors.array().map(error => {
            return error.msg;
        }));
    }
}

module.exports = register;