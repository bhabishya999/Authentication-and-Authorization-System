const {check, validationResult} = require("express-validator");
const userModel = require("../model/User");
const loginValidatedFields = [
    check('email',"Email field is required")
        .notEmpty()
        .isString()
        .withMessage('Username should be a string')
        .custom(userExistsValidation),

    check('password',"Password field is required")
        .notEmpty()
        .isString()
        .withMessage('Password must be a string')
]

async function userExistsValidation(value){
    const userExists = await userModel.findOne({'email': value});
    if(!userExists){
        throw new Error('Invalid user');
    }else{
        return true;
    }
}

module.exports = {
    loginValidatedFields,
    validationResult
}
