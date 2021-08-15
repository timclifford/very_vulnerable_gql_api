const { skip } = require("graphql-resolvers");

const isAuthenticated = async (root, args, { req, user }, info) => {
  if (req.userId || user) {
    return skip;
  } else {
    throw new Error("Access Denied. You must be logged in to access this content.");
  }
};

const isDoctor = async (root, args, { req, user, User }, info) => {
  // Get currrent user.
  const [{ _id, roles }] = await User.find({username: user.username});

  if (roles.includes("doctor")) {
    return skip;
  }
  else {
    throw new Error(`Only doctors have access.`);
  }
};

const isReceptionist = async (root, args, { req, user, User }, info) => {
  // Get currrent user.
  const [{ _id, roles }] = await User.find({username: user.username});

  if (roles.includes("receptionist")) {
    return skip;
  }
  else {
    throw new Error(`Only receptionists have access.`);
  }
};

const isAdmin = async (root, args, { req, user, User }, info) => {
  // Get currrent user.
  const [{ _id, roles }] = await User.find({username: user.username});

  if (roles.includes("admin") || roles.includes("super-admin")) {
    return skip;
  }
  else {
    throw new Error(`Only system administrators have access.`);
  }
};

module.exports = {
  isAuthenticated,
  isDoctor,
  isReceptionist,
  isAdmin
};
