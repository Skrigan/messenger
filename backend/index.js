const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./authRouter');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

const db = 'mongodb+srv://skrigan:skrigan25@cluster0.w4hd5py.mongodb.net/?retryWrites=true&w=majority';
//messenger
const app = express();
app.use(cors());
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "*");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
// });
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