const { render } = require('node-sass');
const resident = require('../models/residential');
const user = require('../models/user');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    storedResident(req, res, next) {
        Promise.all([
            resident.find({}).sortable(req),
            resident.countDocumentsDeleted(),
        ])
            .then(([residents, deleteCount]) =>
                res.render('me/stored-resident', {
                    deleteCount,
                    residents: mutipleMongooseToObject(residents),
                }),
            )
            .catch(next);
    }
    trashResident(req, res, next) {
        resident
            .findDeleted({})
            .then((residents) =>
                res.render('me/trash-resident', {
                    residents: mutipleMongooseToObject(residents),
                }),
            )
            .catch(next);
    }
    storedUser(req, res, next) {
        user.find({})
            .then((users) =>
                res.render('me/stored-user', {
                    users: mutipleMongooseToObject(users),
                }),
            )
            .catch(next);
    }
}

module.exports = new MeController();
