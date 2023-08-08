const express = require('express');
const houseCtrl = require('../controllers/house');

const router = express.Router();

router.get('/list', houseCtrl.displayHouseList);


module.exports = router;

// POST route for adding a new house
// router.post('/houses', houseCtrl.processAddPage);




// // PUT route for updating a house
// router.put('/houses/:id', async (req, res) => {
//     try {
//         const updatedHouse = await houseModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         res.json({ house: updatedHouse });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: err });
//     }
// });
// // GET route for getting details of a property by ID
// router.get('/houses/:id', async (req, res) => {
//     try {
//         const house = await houseModel.findById(req.params.id);
//         if (house) {
//             res.json({ house });
//         } else {
//             res.status(404).json({ error: 'House not found' });
//         }
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: err });
//     }
// });
