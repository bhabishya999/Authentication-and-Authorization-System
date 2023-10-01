const userModel = require('../model/User');
const {validationResult} = require("../validators/SignupValidation");
const {hash} = require("bcrypt");

async function register(req, res) {
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const data = new userModel({
                name: req.body.name,
                email: req.body.email,
                password: await hash(req.body.password, 10),
                usertype: req.body.usertype
            });
            await data.save();
            res.status(200).json({
                message: "Registered successfully"
            });
        } else {
            res.status(400).send(errors.array().map(error => {
                return error.msg;
            }));
        }
    } catch (err) {
        return res.status(500).json({message: "An error occurred"});
    }
}

module.exports = register;