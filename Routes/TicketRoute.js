const express = require('express');
const router = express.Router();
const  findByName  = require('../Controllers/TicketController');


router.route('/findByName/:name').get(findByName);
module.exports = router;