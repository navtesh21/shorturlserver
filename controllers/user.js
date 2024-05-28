const USER = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const salt = "navtesh";
const { v4: uuidv4 } = require("uuid");
const { setUser, getUser } = require("../service");

async function handleCreateUser(req, res) {
  const body = req.body;
  if (!body.email && !body.password && !body.username) {
    res.send("Fill all the conditions");
    return;
  }
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(body.password, salt, async function (err, hash) {
      const entry = await USER.create({
        email: body.email,
        password: hash,
        username: body.username,
      });
      res.json(entry);
    });
  });
}

async function handleLogin(req, res) {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email && !password) {
    res.send("Fill all the conditions");
    return;
  }

  const user = await USER.findOne({ email });
  if (!user) {
    console.log("user not available");
    return res.send("Please signup");
  }
  const result = await bcrypt.compare(password, user.password);
  if (!result) {
    console.log("wrong password");
    return res.send("wrong password");
  }

  const id = uuidv4();
  const token = setUser(user);
  res.cookie("uid", token);
  getUser(token);
  return res.json({ token });
}

module.exports = {
  handleCreateUser,
  handleLogin,
};
