const mongooseDelete = require('mongoose-delete');
const mongoose = require('mongoose');

const Resident = new mongoose.Schema(
    {
        address: { type: String, maxLength: 255 },
        image: String,
        owner: { type: String, required: true },
        resident: String,
        totalPeople: String,
        phone: String,
        vaccine: Number,
    },
    {
        timestamps: true,
    },
);

Resident.query.sortable = function(req) {
    if(req.query.hasOwnProperty('_sort')){
        const isValidtype = ['asc','desc'].includes(req.query.type);
        return this.sort({
            [req.query.column] : isValidtype ? req.query.type : 'desc',
        });
    }
    return this;
}

// Resident.plugin(AutoIncrement);

Resident.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});
module.exports = mongoose.model('Resident', Resident);
