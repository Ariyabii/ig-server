const Route = require("express");
const commentModel = require("../models/commnetSchema");
const postModel = require("../models/postSchema");

const commentRoute = Route();

commentRoute.post("/comment/create", async (req, res) => {
  try {
    const { comments, postId, userId } = req.body;
    const createComment = await commentModel.create({
      comments,
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

module.exports = commentRoute;
