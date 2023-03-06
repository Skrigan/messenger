const Router = require('express');
const router = new Router();
const controller = require('./authController');
const {check} = require('express-validator');
const authMiddleware = require('./middleware/authMiddleware');

//hkh
router.post('/registration', [
    // check('number', '').isMobilePhone(), //!!!!!!!!!!!!!!! валидация номера?
    check('firstname', 'firstname field must be filled').notEmpty(),
    check('lastname', 'lastname field must be filled').notEmpty(),
    check('password', 'password length must be between 4 and 12 characters').isLength({min: 4, max: 12}) //!!!!!!!!!!!!!!!!!!!!!! правильно ли 4 и 12?
], controller.registration);
router.post('/login', controller.login);
router.get('/users', authMiddleware, controller.getUsers);

module.exports = router;