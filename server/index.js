const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer, gql, PubSub, defaultPlaygroundOptions } = require("apollo-server-express");
const jwt = require("jsonwebtoken");
const expressPlayground = require("graphql-playground-middleware-express").default;
const { readFileSync } = require("fs");
const { createServer } = require("http");
const cookieParser = require("cookie-parser");
const User = require("./models/User");
const Practice = require("./models/Practice");
const Appointment = require("./models/Appointment");
const Patient = require("./models/Patient");
const Note = require("./models/Note");
require("dotenv").config();

const typeDefs = gql(readFileSync("./graphql/schema.graphql", { encoding: "utf-8" }));
const resolvers = require("./graphql/resolvers");

const app = express();
const port = process.env.PORT || 8000;
const pubsub = new PubSub();

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`MongoDB connected at ${process.env.MONGO_URI}`))
  .catch((error) => console.error(error));

const { ObjectId } = mongoose.Types;
ObjectId.prototype.valueOf = function () {
  return this.toString();
};

app.use(cookieParser());
app.use((req, res, next) => {
  const { token } = req.cookies;
  console.log("TOKEN COOKIE", token);

  if (token) {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    // put the userId onto the req for future requests to access
    req.userId = _id;
  }
  next();
});

const graphQLServer = new ApolloServer({
  typeDefs,
  resolvers,
  engine: {
    debugPrintReports: true,
  },
  context: ({ req, res, connection }) => {
      //@TODO: https://stackoverflow.com/questions/57814293/my-apollo-servers-subscription-doesnt-works-cannot-read-property-headers-of
      let user;
      if (connection) {
        // Connection = context for subscriptions
        //console.log('connection: ', connection);

        return {
          ...connection.context,
          pubsub
        };
      }
      else {
        const token = req.headers.authorization || null;
        //console.log('Auth headers: ', req.headers);

        if (!token) {
          return { User, req, res, pubsub, user };
        }

        var parts = req.headers.authorization.split(' ');
        if (parts.length === 2) {

          var scheme = parts[0];
          var credentials = parts[1];

          if (/^Bearer$/i.test(scheme)) {
            var cred = credentials;

            //console.log('CREDS', cred);
            // Verify token
            user = jwt.verify(cred, process.env.JWT_SECRET);
          }
        }

          // Check is user has admin role.
          // if (!user || !user.roles.includes('admin')) return null;

              // optionally block the user
              // we could also check user roles/permissions here
              // if (!user) throw new AuthenticationError('You must be logged in');

        const subUser = connection ? connection.context.subUser : null;
        return { User, Practice, Appointment, Patient, Note, req, res, pubsub, subUser, user };
    }
  },
  // Subscriptions are GraphQL operations that watch events emitted from Apollo Server.
  subscriptions: {
    // Authentication over websocket.
    onConnect: async (params, socket) => {
      // Authorisation token on connection.
      const token = params.authToken;
      // console.log('Auth token: ', params.authToken);

      if (token) {
        // Verify token with environment jwt secret.
        const user = jwt.verify(token, process.env.JWT_SECRET);
        if (user) {
          //console.log('User: ', user);
          return Object.assign({}, socket.upgradeReq, { subUser: user });
        }
      }
      throw new Error("User is missing auth token.");
    },
  },
});

const corsEndpoint =
  process.env.NODE_ENV === "development"
    ? `http://${process.env.CLIENT_URI}`
    : `https://${process.env.CLIENT_URI}`;

console.log("CORSENDPOINT", corsEndpoint);

graphQLServer.applyMiddleware({
  app,
  path: "/graphql",
  bodyParserConfig: {
    limit: '100mb',
  },
  cors: { origin: corsEndpoint, credentials: true },
});

const subscriptionEndpoint =
  process.env.NODE_ENV === "development"
    ? `ws://${process.env.SERVER_URI}${graphQLServer.graphqlPath}`
    : `wss://${process.env.SERVER_URI}${graphQLServer.graphqlPath}`;

console.log("SUBSCRIPTION ENDPOINT", subscriptionEndpoint);

app.get(
  "/playground",
  expressPlayground({
    endpoint: "/graphql",
    subscriptionEndpoint,
  })
);

const httpServer = createServer(app);
graphQLServer.installSubscriptionHandlers(httpServer);

httpServer.listen({ port }, () => {
  console.log(`GraphQL Server running @ ${process.env.SERVER_URI}${graphQLServer.graphqlPath}`);
  console.log(`Subscriptions ready at ${process.env.SERVER_URI}${graphQLServer.subscriptionsPath}`);
});
