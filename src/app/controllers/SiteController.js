const { render } = require('node-sass');
const resident = require('../models/residential');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    index(req, res, next) {
        resident
            .find({})
            .then((residents) => {
                res.render('home', {
                    residents: mutipleMongooseToObject(residents),
                });
            })
            .catch(next);
    }
}

module.exports = new SiteController();
