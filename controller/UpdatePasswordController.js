const {validationResult} = require("../validators/UpdatePasswordValidation");
const {compare, hash} = require("bcrypt");
const userModel = require('../model/User');

async function updatePassword(req, res) {
    const errors = validationResult(req);
    if(errors.isEmpty()) {
        const incomingPassword = req.body.password;
        const incomingConfirmPassword = req.body.confirmPassword;
        if (incomingConfirmPassword !== incomingPassword) {
            res.status(401).json({
                message: "Confirm Password should be same as password field"
            })
        }
        const user = await userModel.findOne({email: req.query.email});
        compare(req.body.password, user.password, (err, result) => {
            // console.log(result)
            if (err) {
                res.send(err);
            } else if (result) {
                res.status(401).json({
                    message: "You cannot change password as same as the previous password"
                });
            }
        });
        const updatedData = await userModel.updateOne(
            {
                email: req.query.email
            },
            {
                $set: {
                    password: await hash(req.body.password,10)
                }
            });
        if(updatedData.modifiedCount > 0){
            res.status(200).json({
                message: "Password updated successfully"
            })
        }else{
            res.status(500).json({
                message: "Failed to update password"
            })
        }
    } else {
        res.status(500).send(errors.array().map(error => {
            return error.msg;
        }));
    }
}

module.exports = updatePassword;