const { Schema, default: mongoose } = require("mongoose");

const postSchema = new Schema(
  {
    caption: { type: String, required: true },
    postImage: { type: String, required: true },
    likes: [{ type: mongoose.Types.ObjectId, ref: "likes" }],
    comments: [{ type: mongoose.Types.ObjectId, ref: "comments" }],
    profileImage: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, ref: "users", required: true },
    username: { type: String, required: true },
    bio: { type: String },
    posts: { type: mongoose.Types.ObjectId, ref: "Post" },
    following: [{ type: mongoose.Types.ObjectId, ref: "users" }],
    followers: [{ type: mongoose.Types.ObjectId, ref: "users" }],
  },
  { timeStamps: true }
);

const postModel = mongoose.model("Post", postSchema);

module.exports = postModel;
