const express = require('express');
const router = express.Router();
const {createUser,loginUser,logout,getUserDetails,getAllUsers} = require('../Controller/UserController.js');
router.post('/createUser', createUser);
router.post('/login', loginUser);

router.get('/logout',logout);

router.route('/profile/:id').get(getUserDetails);
router.route('/users').get(getAllUsers);

module.exports = router;