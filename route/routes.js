const express = require('express');
const database = require('../database/connection')
const signUpController = require('../controller/SignupController');
const {validatedFields} = require("../validators/SignupValidation");
const {loginValidatedFields} = require("../validators/LoginValidation");
const loginController = require('../controller/LoginController');
const app = express();

app.use(express.json());

app.post('/api/signup', validatedFields, signUpController);
app.post('/api/login',loginValidatedFields, loginController);

app.listen(5000);