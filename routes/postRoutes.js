const Route = require("express");
const postModel = require("../models/postSchema");
const userModel = require("../models/userSchema");
const authMiddleware = require("../auth-middleware");

const postRoute = Route();

// postRoute.get("/posts", async (req, res) => {
//   const posts = await postModel.find().populate("userId", "email username _id");
//   res.status(200).json(posts);
// });

// postRoute.post("/post/create", authMiddleware, async (req, res) => {
//   try {
//     const { caption, postImage, userId, profileImage, userName } = req.body;
//     const createPost = await postModel.create({
//       caption,
//       profileImage,
//       postImage,
//       userName,
//       userId,
//     });
//     await userModel.findByIdAndUpdate(userId, {
//       $push: {
//         posts: createPost._id,
//       },
//     });
//     res.status(200).json(createPost);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// postRoute.get("/posts", authMiddleware, async (req, res) => {
//   try {
//     const posts = await postModel
//       .find()
//       .populate(
//         "userId",
//         "username profileImage",
//         " bio",
//         " posts",
//         "following",
//         "followers"
//       );
//     res.json(posts);
//   } catch (error) {
//     res.status(404).json({ message: `failed to get posts, ${error}` });
//   }
// });

// postRoute.get("/posts", async (req, res) => {
//   const posts = await postModel
//     .find()
//     .populate(
//       "likes",
//       "username profileImage",
//       "userId",
//       "username profileImage",
//       " bio",
//       " posts",
//       "following",
//       "followers"
//     );
//   res.status(200).json(posts);
// });

postRoute.get("/posts", async (req, res) => {
  const posts = await postModel.find().populate({
    path: "likes",
    populate: {
      path: "users",
      select: "username email",
    },
  });
  res.status(200).json(posts);
});

postRoute.get("/post/:postId", async (req, res) => {
  const { postId } = req.query;
  const response = await postModel.find(postId).populate({
    path: "comments",
    populate: {
      path: "userId",
      select: "username profileImage",
    },
  });
  res.send(response);
});

module.exports = postRoute;
