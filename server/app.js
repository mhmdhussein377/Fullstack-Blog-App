const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv")
const AuthRouter = require("./routes/Auth.js")
const PostRouter = require("./routes/Posts.js")

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173", "https://fullstack-blog-app.onrender.com"]
}));
dotenv.config();
app.use("/uploads", express.static(__dirname + "/uploads"));

mongoose.connect(process.env.MONGO_URL, () => {
    console.log("Database connected");
});

app.use("/api/auth", AuthRouter);

app.use("/api/posts", PostRouter);

app.listen(8800, () => {
    console.log("Server running on port 8800");
});