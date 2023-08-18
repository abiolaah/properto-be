const houseModel = require('../models/house');
const path = require('path');
const houseCtrl = {

    async searchHouses(req, res, next) {
        try {
            const queryFields = ['address', 'price', 'latitude', 'longitude'];
            const searchCriteria = {};
            console.log(req.query);
            queryFields.forEach(field => {
                if (req.query.query[field]) {
                    const queryValue = req.query.query[field];
                    if (queryValue) {
                        if (field === 'latitude' || field === 'longitude') {
                            searchCriteria[field] = parseFloat(queryValue);
                        } else {
                            searchCriteria[field] = { $regex: queryValue, $options: 'i' };
                        }
                    }
                }
            });

            const searchResults = await houseModel.find(searchCriteria).exec();

            res.status(200).json({ results: searchResults });
        } catch (error) {
            console.error("Error searching for houses:", error);
            res.status(500).json({ message: "Error searching for houses" });
        }
    },

    async displayHouseList(req, res, next) {
        try {
            const houses = await houseModel.find().exec();
            res.status(200).json({ houses });
        } catch (error) {
            console.error("Error fetching house list:", error);
            res.status(500).json({ message: "Error fetching house list" });
        }
    },

    async updateHouse(req, res, next) {
        try {
            const houseId = req.params.id;
            const updatedHouse = await houseModel.findByIdAndUpdate(houseId, req.body, { new: true });

            if (!updatedHouse) {
                return res.status(404).json({ message: "House not found" });
            }

            res.status(200).json(updatedHouse);
        } catch (error) {
            console.error("Error updating house:", error);
            res.status(500).json({ message: "Error updating house" });
        }
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

    async findHousesNearby(req, res, next) {
        try {
            const { latitude, longitude } = req.query;

            if (!latitude || !longitude) {
                return res.status(400).json({ message: "Latitude and longitude are required query parameters." });
            }

            const nearbyHouses = await houseModel.find({
                latitude: { $exists: true },
                longitude: { $exists: true },
                $expr: {
                    $lt: [
                        {
                            $let: {
                                vars: {
                                    latDiff: { $subtract: ["$latitude", parseFloat(latitude)] },
                                    lonDiff: { $subtract: ["$longitude", parseFloat(longitude)] }
                                },
                                in: {
                                    $add: [
                                        { $pow: ["$$latDiff", 2] },
                                        { $pow: ["$$lonDiff", 2] }
                                    ]
                                }
                            }
                        },
                        Math.pow(0.005, 2) // Square of the threshold value
                    ]
                }
            }).exec();

            res.status(200).json({ nearbyHouses });
        } catch (error) {
            console.error("Error finding nearby houses:", error);
            res.status(500).json({ message: "Error finding nearby houses" });
        }
    },

    async uploadImage(req, res, next) {
        try {
            console.log(req.file)
            if (!req.file) {
                return res.status(400).json({ message: "No image file provided." });
            }

            const imagePath = path.join('images', req.file.filename);
            res.status(201).json({ file: req.file.filename }); // use this http://localhost:4987/images/{filename}
        } catch (error) {
            console.error("Error uploading image:", error);
            res.status(500).json({ message: "Error uploading image" });
        }
    }

}
module.exports = houseCtrl;