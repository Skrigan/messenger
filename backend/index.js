const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./authRouter');
const PORT = process.env.PORT || 5000;

const db = 'mongodb+srv://skrigan:skrigan25@cluster0.w4hd5py.mongodb.net/?retryWrites=true&w=majority';
//messenger
const app = express();

app.use(express.json());
app.use("/auth", authRouter);
// const http = require("http");
// const server = http.createServer(app);

// const { Server } = require("socket.io");
// const io = new Server(server);


app.listen(PORT, () => {
    console.log("Server is running with port " + PORT);
});


const start = async () => {
    try {
        await mongoose
            .connect(db)
            .then((res) => console.log("connected to db"))
            .catch((err) => console.log(err));
    } catch (e) {
        console.log(e);
    }
}

start();