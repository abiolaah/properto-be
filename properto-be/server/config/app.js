const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
// const path = require('path');

// const authRoute = require('./routes/authRoute')
// const fs = require('fs'); // Import the fs module

dotenv.config();

const app = express();
app.use(express.json());

var originsWhitelist = [
    '*',
    'http://localhost:4200',
];
var corsOptions = {
    origin: function (origin, callback) {
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        // callback(null, isWhitelisted);
        callback(null, true);
    },
    credentials: true
}
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// swagger(app);

mongoose.connect('mongodb+srv://anubhav8080:qG6UvifzmkLtvv8Y@cluster0.mpbedcl.mongodb.net/reland?retryWrites=true&w=majority');
mongoose.connection.on("connected", () => {
    console.log("Connected to DB");
});
mongoose.connection.on("error", err => {
    console.log("DB connection failed: ", err);
});
// app.use(loggerMiddleware);


// app.use('/api/auth', authRoute);
app.listen(4040, () => {
    console.log('Server started on port 4040');
});
