const userModel = require("../models/userSchema");

const createUser = async (req, res) => {
  const userData = req.body;
  const rounds = 10;
  const password = userData.password;
  const hashedPassword = bcrypt.hash(password, rounds);
  const data = { ...userData, password: hashedPassword };
};
