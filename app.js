const express = require('express');
const app = express();
const dotenv = require('dotenv');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
if(process.env.NODE_ENV !== 'production') {
    dotenv.config({ path: './.env'});
}
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
module.exports = app;