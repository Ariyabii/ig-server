userRoute.post("/user/follow", async (req, res) => {
  const { followingUserId, followedUserId } = req.body;
  if (followingUserId === followedUserId) res.status(500).send("cannot");
  try {
    await userModel.findByIdAndUpdate(followingUserId, {
      $addToSet: {
        following: followedUserId,
      },
    });
    await userModel.findByIdAndUpdate(followedUserId, {
      $addToSet: {
        followers: followingUserId,
      },
    });
    res.status(200).json("done");
  } catch (error) {
    throw new Error(error);
  }
});
