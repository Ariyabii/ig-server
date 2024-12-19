const Route = require("express");
const commentModel = require("../models/commentSchema");
const postModel = require("../models/postSchema");

const commentRoute = Route();

commentRoute.post("/comment/create", async (req, res) => {
  try {
    const { comments, profileImage, postId, userId } = req.body;
    const createComment = await commentModel.create({
      comments,
      profileImage,
      postId,
      userId,
    });
    await postModel.findByIdAndUpdate(postId, {
      $push: { comments: createComment._id },
    });
    res.status(200).json(createComment);
  } catch (error) {
    throw new Error(error);
  }
});

commentRoute.get("/getCommentsByPostId", async (req, res) => {
  try {
    const { postId } = req.params;

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

module.exports = commentRoute;
