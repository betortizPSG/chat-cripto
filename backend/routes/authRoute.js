const router = require('express').Router();
const { authMiddleware } = require("../middleware/authMiddleware");

const { userRegister, userLogin, userLogout, userUpdate } = require('../controller/authController');

router.post('/user-login', userLogin);
router.post('/user-register', userRegister);
router.post('/user-logout', userLogout);
router.post('/user-update/:userCode', authMiddleware, userUpdate);

module.exports = router;