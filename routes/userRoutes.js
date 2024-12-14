const Route = require("express");

const userModel = require("../models/userSchema");
const userRoute = Route();

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
