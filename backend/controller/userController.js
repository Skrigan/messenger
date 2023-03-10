const User = require("../models/User");
const Chat = require("../models/Chat");
const UserDto = require('../dtos/user-dto')
const MessageDto = require('../dtos/message-dto')
const Message = require("../models/Message");
const {numberToFormat} = require("../utils");

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
            let {number} = req.body;
            number = numberToFormat(number);
            // console.log(number);
            // const user = await User.findOne({number});
            const regex = new RegExp(number, "i");
            const users = await User.find({ number: { $regex: regex } });
            const response = [];
            for (let i = 0; i < users.length; i++) {
                response.push(new UserDto(users[i]));
            }
            res.json(response);
        } catch (e) {
            console.log(e);
        }
    }

    async sendMessage(req, res) {
        try {
            // const chat = new Chat({members: ['6407bbc9344989acafd8cfb4', '6407e185344989acafd8cfbb']});
            // await chat.save();

            const message = new Message(req.body)
            console.log('new Message: ', message);
            await message.save();
            res.json(message);
        } catch (e) {
            console.log(e);
        }
    }

    async newChat(req, res) {
        try {
            const {sender, text, member} = req.body
            console.log('sender: ', sender,'text: ', text,'member: ', member)
            const chat = new Chat({members: [sender, member]});
            const message = new Message({
                conversationId: chat._id,
                sender,
                text
            })
            console.log('chat: ', chat);
            console.log('message: ', message);
            await chat.save();
            await message.save();
            res.json(message);
        } catch (e) {
            console.log(e);
        }
    }

    async getChats(req, res) {
        try {
            const {_id} = req.body;
            const chats = await Chat.find({'members': _id});
            const usersPromises = chats.map(item => {
                const id = item.members[0] === _id ? item.members[1] : item.members[0];
                return User.findById(id);
            });
            const messagePromises = chats.map(item => {
                const id = item._id.toString();
                return Message.find({'conversationId': id});
            });
            const users = await Promise.all(usersPromises)
                .then(users => {
                    for (let i = 0; i < users.length; i++) {
                        chats[i]['members'][0] === _id
                            ? chats[i]['members'][1] = new UserDto(users[i])
                            : chats[i]['members'][0] = new UserDto(users[i])
                    }
                    return chats;
                })
                .catch(err => {
                    console.error(err);
                });

            const messages = await Promise.all(messagePromises)
                .then(messages => {
                    return messages;
                })
            const response = []
            for (let i = 0; i < chats.length; i++) {
                const obj = {}
                obj.id = users[i]._id;
                obj.member = users[i].members.find((item) => typeof item === 'object')
                // obj.members =  users[i].members;
                obj.messages =  messages[i];
                response.push(obj);
            }
            // console.log(response);
            res.json(response);
        } catch (e) {
            console.log(e);
        }
        // const chat = new Chat({members: ['6407bbc9344989acafd8cfb4', '6407e185344989acafd8cfbb']});
        // await chat.save();

        // const message = new Message({
        //     conversationId: '6409f3b85a43c9515400d64f',
        //     sender: '6407bbc9344989acafd8cfb4',
        //     text: '?????? ?????????'
        // });
        // await message.save();
    }
}

module.exports = new userController();