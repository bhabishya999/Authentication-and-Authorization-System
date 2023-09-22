const userModel = require('../model/User');
const {validationResult} = require("../validators/LoginValidation");
const {compare} = require("bcrypt");
const {sign} = require("jsonwebtoken");

async function login(req, res) {
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const user = await userModel.findOne({email: req.body.email});
            if (user === null) {
                res.status(404).json({
                    message: "This user does not exist"
                })
            } else {
                compare(req.body.password, user.password, (err, result) => {
                    if (err) {
                        res.send(err);
                    } else if (result) {
                        const token = sign({
                                name: user.name,
                                email: user.email
                            },
                            'secretKey',
                            {
                                expiresIn: '1h'
                            })
                        res.status(200).json({
                            token: token,
                            message: "Login Successful"
                        })
                    } else {
                        res.status(401).json({
                            message: "Sorry wrong password"
                        })
                    }
                });
            }
        } else {
            res.status(400).send(errors.array().map(error => {
                return error.msg;
            }));
        }
    } catch (err) {
        return res.status(500).json({message: "An error occurred"});
    }
}

module.exports = login;