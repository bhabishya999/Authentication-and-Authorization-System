const userModel = require('../model/User');

async function userType(req, res, next) {
    const userDetails = await userModel.findOne({'email': req.body.email});
    if (userDetails) {
        switch (userDetails.usertype) {
            case 'admin':
                req.admin = "admin";
                break;
            case 'user':
                req.user = "user";
                break;
        }
    }
    next();
}

module.exports = userType;