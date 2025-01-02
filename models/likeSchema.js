const { Schema, default: mongoose } = require("mongoose");

const likeSchema = new Schema(
  {
    postId: { type: mongoose.Types.ObjectId, ref: "Post", required: true },
    userId: { type: mongoose.Types.ObjectId, ref: "users", required: true },
  },
  { timeStamps: true }
);

const likeModel = mongoose.model("likes", likeSchema);

module.exports = likeModel;
