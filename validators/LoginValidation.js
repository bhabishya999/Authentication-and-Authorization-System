const {check, validationResult} = require("express-validator");
const loginValidatedFields = [
    check('email',"Email field is required")
        .notEmpty()
        .isString()
        .withMessage('Username should be a string'),

    check('password',"Password field is required")
        .notEmpty()
        .isString()
        .withMessage('Password must be a string')
]

module.exports = {
    loginValidatedFields,
    validationResult
}
