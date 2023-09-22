const {check, validationResult} = require("express-validator");

const updatePasswordValidatedFields = [
    check('password','Password field is required')
        .notEmpty()
        .bail()
        .isString()
        .withMessage('Password must be a string')
        .bail()
        .isLength({min:8})
        .withMessage('Password must be minimum 8 characters in length'),

    check('confirmPassword','ConfirmPassword field is required')
        .notEmpty()
        .bail()
        .isString()
        .withMessage('ConfirmPassword must be a string')
        .bail()
        .isLength({min:8})
        .withMessage('ConfirmPassword must be minimum 8 characters in length')
        .custom(validatePasswordMatch)
]
function validatePasswordMatch (value, { req }){
    if (value !== req.body.password) {
        throw new Error(`Passwords do not match`);
    }
    return true;
}

module.exports = {
    updatePasswordValidatedFields,
    validationResult
}