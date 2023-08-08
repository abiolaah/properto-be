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
    
    
}, {
    timestamps: true,
    collection: 'houses'
});

const house = mongoose.model('House', HouseSchema);
module.exports = house;