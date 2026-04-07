import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./src/routes/auth.js";
import authMiddleware from "./src/middleware/auth.js";

dotenv.config();

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

//test route
app.get("/", (req, res) => {
    res.send("API Running");
});

app.get("/api/test", authMiddleware, (req, res) => {
    res.json({
        message: "Protected route accessed",
        user: req.user,
    });
});

// connect DB + start server
mongoose.connect(process.env.MONGO_URI, {
    tls: true,
    tlsAllowInvalidCertificates: true,
}).then(() => {
    console.log("MongoDB Connected");
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
}).catch(err => console.log(err));
