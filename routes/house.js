const express = require('express');
const houseCtrl = require('../controllers/house');
const multer = require('multer');

const router = express.Router();

router.post('/create', houseCtrl.createHouse);
router.put('/update/:id', houseCtrl.updateHouse);
router.delete('/delete/:id', houseCtrl.deleteHouseByPropertyId);
router.get('/list', houseCtrl.displayHouseList);
router.get('/details/:id', houseCtrl.findHouseByPropertyId);
router.get('/search', houseCtrl.searchHouses);
router.get('/find-nearby', houseCtrl.findHousesNearby);

const storage = multer.diskStorage({
    destination: './images',
    filename: function (req, file, cb) {
        const timestamp = Date.now();
        const customName = `image_${timestamp}_${file.originalname}`;
        cb(null, customName);
    }
});
const upload = multer({ storage });
router.post('/upload-image', upload.single('image'), houseCtrl.uploadImage);

module.exports = router;
