const express = require('express');
const { registerUser, authUser, allUsers, getUser, updateProfile, getRandomUser } = require('../controllers/userControllers');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post(registerUser).get(protect, allUsers);
router.post('/login', authUser);
router.route("/:id").get(getUser).put(protect, updateProfile);
router.route("/random").get(protect, getRandomUser); // Add this route for fetching a random user

module.exports = router;
