const { setUser, getUser } = require("../service");

async function checkLogin(req, res, next) {
  console.log(req.headers.authorization);
  if (!req.headers.authorization) return res.send("Token not found");
  const useruid = req.headers.authorization;
  const token = useruid.split(" ")[1];
  console.log(useruid.split(" ")[1]);
  const check = getUser(token);
  console.log(token, check);
  if (!useruid) return res.send("user not found");
  if (!check) return res.send("user not found");
  req.user = check;
  next();
}

module.exports = { checkLogin };
