const jwt = require("jsonwebtoken");
const secret = "navtesh@!23";
function setUser(user) {
  const token = jwt.sign({ id: user._id, email: user.email }, secret);
  return token;
}

function getUser(token) {
  try {
    var decoded = jwt.verify(token, secret);
    return decoded;
  } catch (err) {
    return null;
  }
}
module.exports = { setUser, getUser };
