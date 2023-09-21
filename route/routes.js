const express = require('express');
const database = require('../database/connection')
const signUpController = require('../controller/SignupController');
const loginController = require('../controller/LoginController');
const updatePasswordController = require('../controller/UpdatePasswordController');
const {validatedFields} = require("../validators/SignupValidation");
const {loginValidatedFields} = require("../validators/LoginValidation");
const {updatePasswordValidatedFields} = require("../validators/UpdatePasswordValidation");
const app = express();
const multer = require('multer');
const upload = multer();

app.use(express.json());
app.set('view engine','ejs');

app.post('/api/signup', [upload.none(),validatedFields], signUpController);
app.post('/api/login',[upload.none(),loginValidatedFields], loginController);
app.patch('/api/updatepassword',[upload.none(),updatePasswordValidatedFields],updatePasswordController)

app.listen(5000);