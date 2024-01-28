const jwt = require("jsonwebtoken");
const User = require("../models/registers");
const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const verifyuser = jwt.verify(token, process.env.SECRET_KEY);

    // console.log(verifyuser);
    const cur_user = await User.findOne({ _id: verifyuser._id });
    // console.log(cur_user);
    req.token = token;
    req.user = cur_user;
    console.log("hello auth id");
    // console.log(req.user._id)
    next();
  } catch (err) {
    // console.log(err);
    res.status(401).send(err);
  }
};

module.exports = auth;
