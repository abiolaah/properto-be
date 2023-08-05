// import db package
import mongoose from 'mongoose';

// Complete the DB Configuration
import {MongoURI, Secret} from '../config/config.js';


mongoose.connect(MongoURI);
const db = mongoose.connection;

// Listen for Connections or Errors
db.on('open', () => console.log(`Connected to MongoDB at Localhost`));
db.on('error', () => console.error('Connection Error'));

