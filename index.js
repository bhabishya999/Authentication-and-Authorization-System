const express = require('express');
const database = require('./database/connection');
const app = express();
const signupController = require('./controller/SignupController');

app.use(express.json());

app.use('/api/signup', signupController);

app.listen(5000);