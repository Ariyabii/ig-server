const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoutes");
const postRoute = require("./routes/postRoutes");
const commentRoute = require("./routes/commentRoutes");
const commentModel = require("./models/commnetSchema");
dotenv.config();

const app = express();
const PORT = 8080;
app.use(cors());
app.use(express.json());

app.get("/url", (req, res) => {
  res.send("Resource found");
});

app.use(userRoute);
app.use(postRoute);
app.use(commentRoute);

const connectDatabase = async () => {
  const res = await mongoose.connect(process.env.MONGODB_URI);
  if (res) console.log("db connected");
};

connectDatabase();

app.get("/getCommentsByPostId/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    console.log(postId);

    const comments = await commentModel
      .find({
        postId,
      })
      .populate("userId");

    return res.send(comments);
  } catch (error) {
    throw new Error(error);
  }
});

app.listen(PORT, () => {
  console.log(`your server is running on ${PORT}`);
});
