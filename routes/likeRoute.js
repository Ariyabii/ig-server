const Route = require("express");
const postModel = require("../models/postSchema");

const likeRoute = Route();

likeRoute.post("post/like", async (req, res) => {
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

likeRoute.delete("/unliked", async (req, res) => {
  const { postId, userId } = req.body;
  try {
    await postModel.findByIdAndDelete(postId, {
      $addToSet: {
        postId: userId,
      },
    });
    res.status(200).json("done");
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = likeRoute;
