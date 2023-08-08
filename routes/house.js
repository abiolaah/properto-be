const express = require('express');
const houseCtrl = require('../controllers/house');

const router = express.Router();

router.get('/list', houseCtrl.displayHouseList);
router.get('/details/:id', houseCtrl.findHouseByPropertyId);
router.post('/create', houseCtrl.displayHouseList);
router.put('/update/:id', houseCtrl.displayHouseList);
router.get('/search', houseCtrl.displayHouseList);


module.exports = router;
