const houseModel = require('../models/house');
const houseCtrl = {
    async displayHouseList(req, res, next) {
        const houseCollection = await houseModel.find().exec();

        res.json({ houses: houseCollection });

    },

    async findHouseByPropertyId(req, res, next) {
        try {
            const house = await houseModel.findOne({ _id: req.params.id }).exec();

            if (!house) {
                return res.status(404).json({ message: "House not found" });
            }

            res.json({ house });
        } catch (error) {
            // Handle error and send an appropriate response
            console.error("Error finding house:", error);
            res.status(500).json({ message: "Error finding house" });
        }
    },

    async deleteHouseByPropertyId(req, res, next) {
        try {
            const deletedHouse = await houseModel.findOneAndDelete({ _id: req.params.id }).exec();

            if (!deletedHouse) {
                return res.status(404).json({ message: "House not found" });
            }

            res.json({ message: "House deleted successfully" });
        } catch (error) {
            console.error("Error deleting house:", error);
            res.status(500).json({ message: "Error deleting house" });
        }
    },

    async createHouse(req, res, next) {
        try {
            const newHouseData = req.body; // Assuming the request body contains the new house data

            // Create a new house using the provided data
            const createdHouse = await houseModel.create(newHouseData);

            res.status(201).json({ house: createdHouse });
        } catch (error) {
            console.error("Error creating house:", error);
            res.status(500).json({ message: "Error creating house" });
        }
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