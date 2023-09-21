const userModel = require('../model/User');
const {validationResult} = require("../validators/SignupValidation");
const {hash} = require("bcrypt");

async function register(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        const data = new userModel({
            name : req.body.name,
            email : req.body.email,
            password: await hash(req.body.password,10),
            usertype : req.body.usertype
        });
        const checkEmail = await userModel.find({email: req.body.email});
        if (checkEmail.length !== 0) {
            const emailExistsValidation = {
                msg:"Looks like this email is already registered"
            }
            // res.render('signup',{emailExistsValidation})
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
        // const validationMessage = errors.mapped();
        // res.render('signup',{validationMessage})
        res.status(500).send(errors.array().map(error => {
            return error.msg;
        }));
    }
}

module.exports = register;