const express = require('express');
const database = require('../database/connection')
const signUpController = require('../controller/SignupController');
const {validatedFields} = require("../validators/SignupValidation");
const {loginValidatedFields} = require("../validators/LoginValidation");
const loginController = require('../controller/LoginController');
const app = express();
const multer = require('multer');
const upload = multer();

app.use(express.json());
app.set('view engine','ejs');

// app.get('/signup-form',(req,res)=>{
// res.render('signup');
// })
//
// app.get('/login-form',(req,res)=>{
//     res.render('login');
// })


app.post('/api/signup', [upload.none(),validatedFields], signUpController);
app.post('/api/login',loginValidatedFields, loginController);

app.listen(5000);