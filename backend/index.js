const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./router');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

const db = 'mongodb+srv://skrigan:skrigan25@cluster0.w4hd5py.mongodb.net/?retryWrites=true&w=majority';
const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);

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