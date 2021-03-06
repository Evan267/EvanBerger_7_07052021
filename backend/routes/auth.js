const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();

const logInLimiter = rateLimit({
    windowMs : 3 * 60 * 1000, 
    max : 3,
    message : "trop de tentative de connexion à la suite."
})

const checkPassword = require('../middleware/checkPassword');
const multer = require('../middleware/multer-config-user');
const auth =  require('../middleware/auth');

const authCtrl = require('../controllers/auth');

router.post('/signup', multer, checkPassword, authCtrl.signUp);
router.post('/login', logInLimiter, authCtrl.logIn);
router.get('/', auth, authCtrl.getUser);
router.get('/:userId', auth, authCtrl.getOtherUser);
router.put('/', auth, multer, authCtrl.modifyUser);
router.delete('/', auth, authCtrl.deleteUser);

module.exports = router;