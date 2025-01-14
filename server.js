const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoutes");
const postRoute = require("./routes/postRoutes");
const commentRoute = require("./routes/commentRoutes");
const commentModel = require("./models/commentSchema");
const authMiddleware = require("./auth-middleware");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("./models/userSchema");
const postModel = require("./models/postSchema");
const likeRoute = require("./routes/likeRoute");
dotenv.config();

const app = express();
// const PORT = 8081;
app.use(cors());
app.use(express.json());

app.get("/url", (req, res) => {
  res.send("Resource found");
});

app.use(userRoute);
app.use(postRoute);
app.use(commentRoute);
app.use(likeRoute);

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

app.get("/getProfileId/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const users = await postModel.find({
      userId,
    });

    return res.send(users);
  } catch (error) {
    throw new Error(error);
  }
});

app.get("/posts", authMiddleware, async (req, res) => {
  try {
    const posts = await postModel
      .find()
      .populate("userId", "username profileImage");
    res.json(posts);
  } catch (error) {
    res.status(404).json({ message: `failed to get posts, ${error}` });
  }
});

app.post("/signup", async (req, res) => {
  const { username, password, email, profileImage } = req.body;
  const saltRound = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRound);

    const createUser = await userModel.create({
      username,
      password: hashedPassword,
      email,
      profileImage,
    });
    const token = jwt.sign(
      {
        userId: createUser._id,
        username: createUser.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.send({ token });
  } catch (error) {
    res.json({ message: `failed to createUser ${error} ` });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send("Email and password are required.");
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send("Invalid email or password.");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send("Invalid email or password.");
    }
    const token = jwt.sign({ id: user._id }, { expiresIn: "24h" });
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

app.post("/post/create", async (req, res) => {
  try {
    const { caption, postImage, userId, profileImage } = req.body;
    const createPost = await postModel.create({
      caption,
      postImage,
      userId,
      profileImage,
    });
    await userModel.findByIdAndUpdate(userId, {
      $push: {
        posts: createPost._id,
      },
    });
    res.status(200).json(createPost);
  } catch (error) {
    throw new Error(error);
  }
});

app.post("/post/like", async (req, res) => {
  const { postId, userId } = req.body;
  try {
    await postModel.findByIdAndUpdate(postId, {
      $addToSet: {
        postId: userId,
      },
    });
    res.status(200).json("done");
  } catch (error) {
    throw new Error(error);
  }
});

app.post("/post/user", async (req, res) => {
  const { userId } = req.body;
  try {
    await postModel.findByIdAndUpdate(postId, {
      $addToSet: {
        postId: userId,
      },
    });
    res.status(200).json("done");
  } catch (error) {
    throw new Error(error);
  }
});

const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

console.log("aa8081");
