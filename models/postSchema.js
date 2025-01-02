const { Schema, default: mongoose } = require("mongoose");

const postSchema = new Schema(
  {
    caption: { type: String, required: true },
    postImage: { type: String, required: true },
    profileImage: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, ref: "users", required: true },
    likes: [{ type: mongoose.Types.ObjectId, ref: "likes" }],
    comments: [{ type: mongoose.Types.ObjectId, ref: "comments" }],
  },
  { timeStamps: true }
);

const postModel = mongoose.model("Post", postSchema);

module.exports = postModel;
