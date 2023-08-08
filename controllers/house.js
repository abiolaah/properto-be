const houseModel = require('../models/house');
const houseCtrl = {
    async displayHouseList(req, res, next) {
        const houseCollection = await houseModel.find().exec();

        res.json({ houses: houseCollection });

    },

    async findHouseByPropertyId(req, res, next) {
        const house = await houseModel.findOne({ _id:req.params.id });
        return house;
    },

    async processAddPage(req, res, next) {
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
        const house = await houseModel.create(newHouse).exec();

        res.json(house);


    }

}
module.exports = houseCtrl;