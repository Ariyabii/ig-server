const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoutes");
const postRoute = require("./routes/postRoutes");
const commentRoute = require("./routes/commentRoutes");


const connectDatabase = async () => {
    const res = await mongoose.connect(
        "mongodb+srv://Ariyaa:9JQLts4SGLYoGiUa@cluster0.9qig3.mongodb.net/instagram?retryWrites=true&w=majority&appName=Cluster0"
    );
    if (res) console.log("db connected");
};

connectDatabase();


const app = express();
const PORT = 8080;
app.use(express.json());


app.use(userRoute);
app.use(postRoute);
app.use(commentRoute);

app.listen(PORT, () => {
    console.log(`your server is running on ${PORT}`);
});
