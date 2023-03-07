const jwt = require('jsonwebtoken');
const {secret} = require('../config');

module.exports = function(req, res, next) {
    if(req.method === 'OPTIONS') {
        next();
    }
    try {
        // console.log(req.headers.authorization);
        // let token = req.headers.authorization.split(' ')[1];
        let token = req.headers.authorization;
        if (!token) {
            return res.status(403).json({message: 'Пользователь не авторизован'})
        } else {
            token = token.split(' ')[1];
        }
        const decodedData = jwt.verify(token, secret);
        req.user = decodedData;
        next();
    } catch (e) {
        console.log(e);
        return res.status(403).json({message: 'Пользователь не авторизован'})
    }
}