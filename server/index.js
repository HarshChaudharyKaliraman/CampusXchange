import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

//middleware
app.use(cors());
app.use(express.json());

//test route
app.get("/", (req, res) => {
    res.send("API Running");
});

// connect DB + start server
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("MongoDB Connected");
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
}).catch(err => console.log(err));