const {check, validationResult} = require("express-validator");
const validatedFields = [
    check('name', 'Name is required')
        .notEmpty()
        .isString()
        .withMessage('Name must be a string'),

    check('email', 'Email is required')
        .notEmpty()
        .isEmail()
        .withMessage('Invalid email format')
        .isString()
        .withMessage('Email must be a string'),

    check('password', 'Password is required')
        .notEmpty()
        .isLength({min: 8})
        .withMessage('Password must be at least 8 characters')
        .isString()
        .withMessage('Password must be a string')
]


module.exports = {
    validatedFields,
    validationResult
}