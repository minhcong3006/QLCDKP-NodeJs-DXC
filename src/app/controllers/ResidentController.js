const { render } = require('node-sass');
const resident = require('../models/residential');
const { mongooseToObject } = require('../../util/mongoose');

class ResidentController {
    //[GET] /home
    show(req, res, next) {
        resident
            .findOne({ _id: req.params.id })
            .then((residents) => {
                res.render('resident/show', {
                    residents: mongooseToObject(residents),
                });
            })
            .catch(next);
    }

    //[GET]
    create(req, res, next) {
        res.render('resident/create');
    }

    //[POST] /resident/create
    store(req, res, next) {
        const residents = new resident(req.body);
        residents
            .save()
            .then(() => res.redirect('/me/stored/residents'))
            .catch(next);
        if (req.file) {
            let path = '';
            req.files.forEach(function (files, index, arr) {
                path = path + files.path + ',';
            });
            path = path.substring(0, path.lastIndexOf(','));
            resident.image = path;
        }
    }

    //[GET] /resident/id/edit
    edit(req, res, next) {
        resident
            .findById(req.params.id)
            .then((residents) =>
                res.render('resident/edit', {
                    residents: mongooseToObject(residents),
                }),
            )
            .catch(next);
    }
    //[PUT] /resident/id/edit
    update(req, res, next) {
        resident
            .updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/residents'))
            .catch(next);
    }

    //[DELETE]
    destroy(req, res, next) {
        resident
            .delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    destroyForce(req, res, next) {
        resident
            .deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    restore(req, res, next) {
        resident
            .restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                resident
                    .delete({ _id: { $in: req.body.residentIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'action is invalid' });
        }
    }
    handleRestoreFormActions(req, res, next) {
        switch (req.body.action) {
            case 'restore':
                resident
                    .restore({ _id: { $in: req.body.residentIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'action is invalid' });
        }
    }
    handleDeleteFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                resident
                    .deleteOne({ _id: { $in: req.body.residentIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'action is invalid' });
        }
    }
}

module.exports = new ResidentController();
