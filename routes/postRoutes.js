const Route = require("express");
const postModel = require("../models/postSchema");
const userModel = require("../models/userSchema");

const postRoute = Route();

postRoute.get("/posts", async (req, res) => {
    const posts = await postModel.find().populate("userId", "email username _id");
    res.status(200).json(posts);
});

postRoute.post("/post/create", async (req, res) => {
    try {
        const { caption, profileImage, userId } = req.body;
        const createPost = await postModel.create({
            caption,
            profileImage,
            userId,
        });
        await userModel.findByIdAndUpdate(userId, {
            $push: { posts: createPost._id, }
        });
        res.status(200).json(createPost);
    } catch (error) {
        throw new Error(error);
    }
});

postRoute.get("/posts", async (req, res) => {
    const posts = await postModel.find();
    res.status(200).json(posts);
});

module.exports = postRoute;