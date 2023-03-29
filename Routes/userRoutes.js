const express = require('express');
const router = express.Router();
const {createUser,loginUser,logout,getUserDetails,getAllUser,getUserByEmail } = require('../Controller/UserController.js');

const {isAuthenticatedUser,authorizeRoles} = require('../middleware/auth.js');

router.post('/createUser', createUser);
router.post('/login', loginUser);

router.get('/logout',logout);

router.route('/profile/:id').get(getUserDetails);

router.route('/user/:email').get(getUserByEmail);

module.exports = router;