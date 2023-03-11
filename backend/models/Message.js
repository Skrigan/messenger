const {Schema, model} = require('mongoose');

const Message = new Schema({
    conversationId: {type: String, required: true},
    sender: {type: String, required: true},
    text: {type: String, required: true}
    // firstname: {type: String, required: true},
    // lastname: {type: String, required: true},
    // number: {type: String, unique: true, required: true},
    // password: {type: String, required: true},
    // roles: [{type: String, ref: 'Role'}]
})

module.exports = model('Message', Message);