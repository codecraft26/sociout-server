const express = require('express');
const router = express.Router();
const {createUser,loginUser,logout} = require('../Controller/UserController.js');

router.post('/createUser', createUser);


router.post('/login', loginUser);

router.get('/logout',logout);
module.exports = router;