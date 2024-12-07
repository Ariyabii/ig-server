const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const dotenv = require('dotenv')
const userRoute = require("./routes/userRoutes");
const postRoute = require("./routes/postRoutes");
const commentRoute = require("./routes/commentRoutes");
dotenv.config()

const app = express();
const PORT = 8080;
app.use(cors())
app.use(express.json());


app.use(userRoute);
app.use(postRoute);
app.use(commentRoute);



const connectDatabase = async () => {
    const res = await mongoose.connect(process.env.MONGODB_URI);
    if (res) console.log("db connected");
};

connectDatabase();

app.listen(PORT, () => {
    console.log(`your server is running on ${PORT}`);
});
