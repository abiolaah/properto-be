const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HouseSchema = new Schema({
    name: String,
    address: String,
    type: String,
    status: String,
    price: String,
    bedrooms: String,
    bathrooms: String,
    parking: String,
    description: String,
    squareFeet: String,
    latitude: Number,
    longitude: Number,
    images:[String]
}, {
    timestamps: true,
    collection: 'houses'
});

const House = mongoose.model('House', HouseSchema);
module.exports = House;
