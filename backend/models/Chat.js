const {Schema, model} = require('mongoose');

const Chat = new Schema({
    members: {
        type: Array,
    }
})

module.exports = model('Chat', Chat);