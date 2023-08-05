import express from 'express';
import { displayHouseList, processAddPage } from '../controllers/house.js';

const router = express.Router();

// GET route for displaying the list of houses
router.get('/houses', displayHouseList);

// POST route for adding a new house
router.post('/houses', processAddPage);

export default router;

