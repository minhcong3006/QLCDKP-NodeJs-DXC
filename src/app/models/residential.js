
var mongoose = require('mongoose');

const Resident = new mongoose.Schema({   
    address: String,
    image: String,
    owner: String,
    resident: String,
    totalPeople: String,
    phone: String,
    vaccine: Number,
}, {
    timestamps: true,
});
module.exports= mongoose.model('Resident',Resident);