const User = require("../models/User");
const Chat = require("../models/Chat");
const UserDto = require('../dtos/user-dto')

class userController {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (e) {
            console.log(e);
        }
    }

    async getUsersByNumber(req, res) {
        try {
            const {number} = req.body;
            const user = await User.findOne({number});
            const UserInfo = new UserDto(user[0]);
            res.json(UserInfo);
        } catch (e) {
            console.log(e);
        }
    }

    async getChats(req, res) {
        try {
            console.log(req.body);
            const {_id} = req.body;
            // const chat = await Chat.find({'members':{$elemMatch: _id}});
            const chat = await Chat.find({'members': _id});
            // db.users.find({ 'emails':{ $elemMatch: {'address': 'user@gmail.com'}}})
            // console.log(chat);
            // const chat = new UserDto(user[0]);
            res.json(chat);
        } catch (e) {
            console.log(e);
        }
        // const chat = new Chat({members: ['6407bbc9344989acafd8cfb4', '6407e185344989acafd8cfbb']});
        // await chat.save();
    }
}

module.exports = new userController();