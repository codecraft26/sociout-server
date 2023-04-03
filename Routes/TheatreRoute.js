const express = require('express');
const router = express.Router();
const {isAuthenticatedUser,authorizeRoles} = require('../middleware/auth.js');

const {createTheatre,getTheatre,findByName} = require('../Controller/TheatreController.js');


router.route('/createtheatre').post(isAuthenticatedUser,authorizeRoles('admin')   ,createTheatre);
router.route('/:id').get(isAuthenticatedUser ,getTheatre);


module.exports = router;
