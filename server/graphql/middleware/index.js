const { skip } = require("graphql-resolvers");

const isAuthenticated = async (root, args, { req, user }, info) => {
  // @TODO add roles here to check if a certain role

  //console.log(req);

  if (req.userId || user) {
    return skip;
  } else {
    throw new Error("Access Denied");
  }
};

module.exports = {
  isAuthenticated
};
