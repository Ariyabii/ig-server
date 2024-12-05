const { Schema, default: mongoose } = require("mongoose");

const commentSchema = new Schema(
    {
        comments: [{ type: mongoose.Types.ObjectId, ref: "comments" }],
        postId: { type: mongoose.Types.ObjectId, ref: "posts", required: true },
        userId: { type: mongoose.Types.ObjectId, ref: "users", required: true },
        likes: [{ type: mongoose.Types.ObjectId, ref: "likes" }],
    },
    { timeStamps: true }
);

const commentModel = mongoose.model("comments", commentSchema);

module.exports = commentModel;
