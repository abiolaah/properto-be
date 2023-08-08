const houseModel = require('../models/house');
const houseCtrl = {
    async displayHouseList(req, res, next) {
        const houseCollection = await houseModel.find().exec();

        // houseModel.find((err, houseCollection) => {
        //     if (err) {
        //         console.error(err);
        //         res.status(500).json({ error: err });
        //     } else {
                res.json({ houses: houseCollection });
        //     }
        // });
    },

    async findHouseByPropertyId(propertyId) {
        const house = await houseModel.findOne({ propertyId });
        return house;
    },

    async processAddPage (req, res, next) {
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

}
module.exports = houseCtrl;