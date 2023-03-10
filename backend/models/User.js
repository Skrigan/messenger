const {Schema, model} = require('mongoose');

const User = new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    number: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    roles: [{type: String, ref: 'Role'}]
})

module.exports = model('User', User);