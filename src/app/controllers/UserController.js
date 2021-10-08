const { render } = require('node-sass');
const user = require('../models/user');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class UserController {
    deleteUser(req, res, next) {
        user.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new UserController();
