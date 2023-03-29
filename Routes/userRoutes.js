const express = require('express');
const router = express.Router();
const {createUser,loginUser} = require('../Controller/UserController.js');

router.post('/createUser', createUser);


router.post('/login', loginUser);
module.exports = router;