const express = require('express');
const app = express();
const dotenv = require('dotenv');

const bodyParser = require('body-parser');
const cors = require('cors');
if(process.env.NODE_ENV !== 'production') {
    dotenv.config({ path: './.env'});
}
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


//route Imports 
const userRoutes = require('./Routes/userRoutes');

app.use('/api/v1', userRoutes);

module.exports = app;