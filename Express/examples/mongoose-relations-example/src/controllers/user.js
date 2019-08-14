const { Router } = require("express");

const User = require("../models/User");
const Skill = require("../models/Skill");
const Post = require("../models/Post");


const router = Router();

const createData = async () => {
  const user = new User({
    username: "zack",
    email: "za@ck.com",
    password: "1234567",
  });
  await user.save();

  const skill = new Skill({
    name: "Fireball",
    experience: 40
  });
  await skill.save();

  user.skills.push(skill._id);
  await user.save();

  return user;
}

const createPost = async () => {
  const post = new Post({
    title: "Hello World",
    body: "I am the jello man!",
    user: "5d536bb84f83ef0bbedd1ab5"
  })

  await post.save();
} 

router.get("/", async (req, res) => {
  await createPost();

  const users = await User.find().populate(["skills", "posts"]);

  res.send(users);
})

module.exports = router;