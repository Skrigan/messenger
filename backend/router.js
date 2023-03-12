const Router = require('express');
const router = new Router();
const authController = require('./controller/authController');
const userController = require('./controller/userController');
const {check} = require('express-validator');
const authMiddleware = require('./middleware/authMiddleware');

router.post('/registration', [
    // check('number', '').isMobilePhone(), //!!!!!!!!!!!!!!! валидация номера?
    check('firstname', 'firstname field must be filled').notEmpty(),
    check('lastname', 'lastname field must be filled').notEmpty(),
    check('password', 'password length must be between 4 and 12 characters').isLength({min: 4, max: 12}) //!!!!!!!!!!!!!!!!!!!!!! правильно ли 4 и 12?
], authController.registration);
router.post('/login', authController.login);
router.post('/usersByNumber', authMiddleware, userController.getUsersByNumber);
router.post('/getChats', authMiddleware, userController.getChats)
router.post('/sendMessage', authMiddleware, userController.sendMessage)
router.post('/newChat', authMiddleware, userController.newChat)
router.get('/users', authMiddleware, userController.getUsers);

module.exports = router;