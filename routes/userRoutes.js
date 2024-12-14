const Route = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userSchema");
const userRoute = Route();

userRoute.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;
  const saltRound = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRound);
    const createUser = await userModel.create({
      username,
      password: hashedPassword,
      email,
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

// userRoute.post("/signup", async (req, res) => {
//   const { username, password, email, profileImage } = req.body;
//   try {
//     const response = await userModel.create({
//       username,
//       password,
//       email,
//       profileImage,
//     });
//     res.status(200).json(response);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

userRoute.get("/user/posts", async (req, res) => {
  try {
    const posts = await userModel
      .find()
      .populate("posts", "postImage caption comments");
    res.status(200).json(posts);
  } catch (error) {
    throw new Error(error);
  }
});

userRoute.post("/user/follow", async (req, res) => {
  const { followingUserId, followedUserId } = req.body;
  if (followingUserId === followedUserId) res.status(500).send("cannot");
  try {
    await userModel.findByIdAndUpdate(followingUserId, {
      $addToSet: {
        following: followedUserId,
      },
    });
    await userModel.findByIdAndUpdate(followedUserId, {
      $addToSet: {
        followers: followingUserId,
      },
    });
    res.status(200).json("done");
  } catch (error) {
    throw new Error(error);
  }
});

userRoute.delete("/user/unfollow", async (req, res) => {
  const { followingUserId, followedUserId } = req.body;
  try {
    await userModel.findByIdAndDelete(followingUserId, {
      $deleteToSet: {
        following: followedUserId,
      },
    });
    await userModel.findByIdAndDelete(followedUserId, {
      $deleteToSet: {
        followers: followingUserId,
      },
    });
    res.status(200).json("done");
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = userRoute;
