import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const HouseSchema = new Schema({
    propertyId: String,
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

export default mongoose.model('House', HouseSchema);