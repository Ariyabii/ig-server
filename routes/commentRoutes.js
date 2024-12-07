const Route = require("express");

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
      $push: { posts: createComment._id },
    });
    await userModel.findByIdAndUpdate(userId, {
      $addToSet: { posts: createComment._id },
    });
    console.log("amjilttai");
    res.status(200).json(createComment);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = commentRoute;
