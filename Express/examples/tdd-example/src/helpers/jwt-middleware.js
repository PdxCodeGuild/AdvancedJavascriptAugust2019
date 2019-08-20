const jwt = require("jsonwebtoken");
const User = require("../models/User");

const jwtMiddleware = async (req, res, next) => {
  const authorization = req.header("Authorization") || "";
  const [type, token] = authorization.split(" ");

  try {
    if(type === "Bearer" && jwt.verify(token, "CHANGEME!")) {
      const payload = jwt.decode(token, "CHANGEME!");
      const user = await User.findOne({_id: payload._id});
      req.user = user;
      next();
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch(err) {
    res.status(401).send("Unauthorized");
  }
}

module.exports = jwtMiddleware;