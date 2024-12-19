const { Schema, default: mongoose } = require("mongoose");

const commentSchema = new Schema(
  {
    comments: { type: String, required: true },
    profileImage: { type: String, required: true },
    postId: { type: mongoose.Types.ObjectId, required: true, ref: "Post" },
    userId: { type: mongoose.Types.ObjectId, required: true, ref: "users" },
  },
  { timeStamps: true }
);

const commentModel = mongoose.model("comments", commentSchema);

module.exports = commentModel;
