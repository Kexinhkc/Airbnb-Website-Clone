const mongoose = require('mongoose');

const bookingScheme = new mongoose.Schema({
    place: {type: mongoose.Schema.Types.ObjectID, required: true, ref: 'Place'}, //What 'ref' do is to look up the property using the place id within the Place database
    user: {type: mongoose.Schema.Types.ObjectID, required: true},
    checkIn: {type:Date, required: true},
    checkOut: {type:Date, required: true},
    name: {type:String, required: true},
    phone:{type:String, required: true},
    price: Number,
});

const BookingModel = mongoose.model('Booking', bookingScheme);
module.exports = BookingModel;