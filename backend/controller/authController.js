const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const {secret} = require('../config');
const UserDto = require('../dtos/user-dto')
const {numberToFormat} = require('../utils')
const Chat = require("../models/Chat");

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: '24h'});
}

class authController {
    async registration(req, res) {
        // console.log('token: ', req.headers.authorization);
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации", errors});
            }
            let { firstname, lastname, number, password } = req.body;
            const candidate = await User.findOne({number}) //!!!!!!!!!!!!!!!!!!!!!!!!! findById(mongoID)
            if (candidate) {
                return res.status(400).json({message: 'Пользователь с таким номером уже существует'});
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: "USER"});
            number = numberToFormat(number);
            const user = new User({firstname, lastname, number, password: hashPassword, roles: [userRole.value]});
            await user.save();
            return res.json({message: 'Пользователь успешно зарегистрирован'})
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Registration error'});
        }
    }
    async login(req, res) {
        // console.log('token: ', req.headers.authorization);
        try {
            const {number, password} = req.body;
            console.log('number: ', number, 'password: ', password);
            const user = await User.findOne({number});
            if (!user) {
                return res.status(400).json({message: `Пользователь по номеру ${number} не найден`});
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({message: `Введён неверный пароль`});
            }
            const token = generateAccessToken(user._id, user.roles); //(он в токен зашивает dto)!!!!!!!!
            const userDto = new UserDto(user);
            return res.json({token, user: userDto});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Login error'});
        }
    }
}

module.exports = new authController();