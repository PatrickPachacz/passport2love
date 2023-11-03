const express = require('express');
const { registerUser, authUser, allUsers, getUser, updateProfile  } = require('../controllers/userControllers');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router()

router.route('/').post(registerUser).get(protect, allUsers);
router.post('/login', authUser);
router.route("/:id").get(getUser);
router.route("/:id").put(protect, updateProfile);



module.exports = router;