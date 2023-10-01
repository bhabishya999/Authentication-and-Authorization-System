const express = require('express');
const database = require('../database/connection')
const signUpController = require('../controller/SignupController');
const loginController = require('../controller/LoginController');
const updatePasswordController = require('../controller/UpdatePasswordController');
const {validatedFields} = require("../validators/SignupValidation");
const {loginValidatedFields} = require("../validators/LoginValidation");
const {updatePasswordValidatedFields} = require("../validators/UpdatePasswordValidation");
const userTypeMiddleware = require('../middleware/UserTypeMiddleware');
const app = express();
const multer = require('multer');
const {Router} = require("express");
const upload = multer();
const route = express.Router();
route.use(userTypeMiddleware);

app.use(express.json());
app.use(upload.none());
app.set('view engine','ejs');
app.use(route);

app.post('/api/signup', validatedFields, signUpController);
route.post('/api/login',loginValidatedFields, loginController);
app.patch('/api/updatepassword',updatePasswordValidatedFields,updatePasswordController)

app.listen(5000);