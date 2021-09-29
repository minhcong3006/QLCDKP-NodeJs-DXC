const { render } = require('node-sass');
const resident = require('../models/residential');
const { mongooseToObject } = require('../../util/mongoose');

class ResidentController {

    show(req, res, next) {
        resident.findOne({ id: req.params.id })
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

    
    

    //[POST]
    store(req, res, next) {
        const residents = new resident(req.body);
            residents
                .save()
                .then(() => res.redirect('/me/stored/residents'))
            .catch(next);
        if (req.file) {
            let path = "";
            req.files.forEach(function (files, index, arr) {
                path = path + files.path + ','
            })
            path = path.substring(0, path.lastIndexOf(','));
            resident.image = path;
        }
    }

    //[GET]
    edit(req, res, next) {
        resident.findById(req.params.id)
            .then(residents => res.render('resident/edit', {
                    residents: mongooseToObject(residents),
                }))
            .catch(next);
    }
    //[PUT]
    update(req, res, next) {
        resident.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/residents'))
            .catch(next);
    }

    //[DELETE]
    destroy(req, res, next){
        resident.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
        .catch(next);
    }

}

module.exports = new ResidentController();