const jwt = require("jsonwebtoken");

// create JWT token
const createToken = (user, secret) => {
  const { _id, username, email } = user;
  return jwt.sign({ _id, username, email }, secret);
};

module.exports = createToken;
