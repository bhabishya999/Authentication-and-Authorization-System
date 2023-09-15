const {connect} = require("mongoose");
connect('mongodb://127.0.0.1:27017/authenticationSystem')
    .then(() => console.log('Connected'))
    .catch(() => console.log('Failed to connect'));