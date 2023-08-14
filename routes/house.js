const express = require('express');
const houseCtrl = require('../controllers/house');

const router = express.Router();

router.post('/create', houseCtrl.createHouse);
router.put('/update/:id', houseCtrl.displayHouseList);
router.delete('/delete/:id', houseCtrl.deleteHouseByPropertyId);
router.get('/list', houseCtrl.displayHouseList);
router.get('/details/:id', houseCtrl.findHouseByPropertyId);
router.get('/search', houseCtrl.displayHouseList);


module.exports = router;
