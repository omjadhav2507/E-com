require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Database connection
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    console.log("Connected to MongoDB");
});

mongoose.connection.on('error', (error) => {
    console.error("Error connecting to MongoDB:", error);
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 5001;

app.get('/', (req, res) => {
    res.send("om jadhav");
});

app.listen(PORT, () => {
    console.log(`Running on port: ${PORT}`);
});
