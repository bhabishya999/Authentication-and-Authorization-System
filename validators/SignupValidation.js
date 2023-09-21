const {check, validationResult} = require("express-validator");
const validatedFields = [
    check('name', 'Name is required')
        .notEmpty()
        .bail()
        .isString()
        .withMessage('Name must be a string'),

    check('email', 'Email is required')
        .notEmpty()
        .bail()
        .isEmail()
        .withMessage('Invalid email format')
        .bail()
        .isString()
        .withMessage('Email must be a string'),

    check('password', 'Password is required')
        .notEmpty()
        .bail()
        .isLength({min: 8})
        .withMessage('Password must be at least 8 characters')
        .bail()
        .isString()
        .withMessage('Password must be a string'),

    check('usertype', 'usertype is required')
        .notEmpty()
        .bail()
        .isString()
        .withMessage('Usertype must be a string')
]


module.exports = {
    validatedFields,
    validationResult
}