const { Schema, default: mongoose } = require("mongoose");

const postSchema = new Schema(
    {
        caption: { type: String, required: true },
        profileImage: { type: String, required: true },
        userId: { type: mongoose.Types.ObjectId, ref: "users", required: true },
        comments: [{ type: mongoose.Types.ObjectId, ref: "comments" }],
        likes: [{ type: mongoose.Types.ObjectId, ref: "likes" }],
    },
    { timeStamps: true }
);

const postModel = mongoose.model("Post", postSchema);

module.exports = postModel;