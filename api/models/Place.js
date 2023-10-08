const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    
    owner:{type:mongoose.Schema.Types.ObjectId, ref:'User'}, //'mongoose...ObjectId' is a unique identifier for each document in this database, 'ref' means that value of this propoerty should reference documents in the User database
    title: String,
    address:String,
    photos:[String],
    description: String,
    perks: [String],
    extraInfo: String,
    checkIn: Number,
    checkOut: Number,
    maxGuests: Number,
    price: Number,

});

//'Place' is the name of the database that is used to access the database
const PlaceModel = mongoose.model('Place', placeSchema);
module.exports = PlaceModel;