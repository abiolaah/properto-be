// define the housemodel
import houseModel from '../models/house.js';

/* GET HOUSES List page. */
export function displayHouseList(req, res, next) {
    // find all houses in the house collection
    houseModel.find((err, houseCollection) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: err });
        } else {
            res.json({ houses: houseCollection });
        }
    });
}
// Validation check on the property ID

async function isPropertyIdAvailable(propertyId) {
    const house = await houseModel.findOne({ propertyId });
    return !house;
}

// Find house by property

import houseModel from '../models/house.js';

async function findHouseByPropertyId(propertyId) {
    const house = await houseModel.findOne({ propertyId });
    return house;
}


//  GET the House Details page in order to add a new house
export function displayAddPage(req, res, next) {

    res.render('index', { title: 'Add House', page: 'house/add', houses: {} });  
  
}

// POST process the House Details page and create a new House - CREATE
export function processAddPage(req, res, next) {
    let newHouse = houseModel({
        propertyId: req.body.propertyId,
        name: req.body.name,
        address: req.body.address,
        type: req.body.type,
        status: req.body.status,
        price: req.body.price,
        bedrooms: req.body.bedrooms,
        bathrooms: req.body.bathrooms,
        parking: req.body.parking,
        description: req.body.description,
        squareFeet: req.body.squareFeet,
    });

    houseModel.create(newHouse, (err, house) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: err });
        } else {
            res.json({ house });
        }
    });
}
