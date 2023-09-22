const { validationResult } = require("../validators/UpdatePasswordValidation");
const { compare, hash } = require("bcrypt");
const userModel = require('../model/User');

async function updatePassword(req, res) {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array().map(error => error.msg));
        }

        const user = await userModel.findOne({ email: req.query.email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const passwordsMatch = await compare(req.body.password, user.password);

        if (passwordsMatch) {
            return res.status(401).json({
                message: "You cannot change the password to the same as the previous password"
            });
        }

        const updatedData = await userModel.updateOne(
            { email: req.query.email },
            {
                $set: {
                    password: await hash(req.body.password, 10)
                }
            }
        );

        if (updatedData.modifiedCount > 0) {
            return res.status(200).json({
                message: "Password updated successfully"
            });
        } else {
            return res.status(500).json({
                message: "Failed to update the password"
            });
        }
    } catch (err) {
        return res.status(500).json({ message: "An error occurred" });
    }
}

module.exports = updatePassword;
