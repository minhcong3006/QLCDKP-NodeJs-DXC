const { render } = require('node-sass');
const resident = require('../models/residential');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    storedResident(req, res, next) {

        resident.find({})
            .then(residents => res.render('me/stored-resident', {
                residents: mutipleMongooseToObject(residents)
            }))
            .catch(next);
    }
}

module.exports = new MeController();