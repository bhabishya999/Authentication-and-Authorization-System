const {check, validationResult} = require("express-validator");
const userModel = require('../model/User');
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
        .withMessage('Email must be a string')
        .custom(emailInUseValidation),

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

async function emailInUseValidation(value){
    const checkEmail = await userModel.findOne({'email': value});
    if(checkEmail){
        throw new Error(`Looks like this email is already registered`);
    }else{
        return true;
    }
}

module.exports = {
    validatedFields,
    validationResult
}