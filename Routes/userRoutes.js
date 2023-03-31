const express = require('express');
const router = express.Router();
const {createUser,loginUser,logout,getUserDetails,getAllUser } = require('../Controller/UserController.js');

const {isAuthenticatedUser,authorizeRoles} = require('../middleware/auth.js');

router.post('/createUser', createUser);
router.post('/login', loginUser);

router.get('/logout',logout);

//create route for user details of login user through jwt token
router.route('/me').get(isAuthenticatedUser,getUserDetails);

//create a route for logout
router.route('/logout').get(logout);

//route for update 
router.route('/update').put(isAuthenticatedUser,getUserDetails);
// route for getalluser

router.route('/alluser').get(isAuthenticatedUser,authorizeRoles('admin'),getAllUser);


    

module.exports = router;