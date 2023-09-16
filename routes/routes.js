const express = require('express');
const signUpController = require('../controller/SignupController');
const {validatedFields} = require("../validators/SignupValidation");
const app = express();

app.use(express.json());

app.post('/', validatedFields, signUpController)

module.exports = app;
