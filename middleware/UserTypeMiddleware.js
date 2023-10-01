const userModel = require('../model/User');

async function userType(req, res, next) {
    const userDetails = await userModel.findOne({'email': req.body.email});
    switch (userDetails.usertype) {
        case 'admin':
            req.isAdmin = true;
            break;
        case 'user':
            req.isAdmin = false;
            break;
    }
    next();
}

module.exports = userType;