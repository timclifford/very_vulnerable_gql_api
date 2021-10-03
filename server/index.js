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
const MedicalRecord = require("./models/MedicalRecord");
const Note = require("./models/Note");
require("dotenv").config();

const typeDefs = gql(readFileSync("./graphql/schema.graphql", { encoding: "utf-8" }));
const resolvers = require("./graphql/resolvers");

const app = express();
const port = process.env.PORT || 8000;
const pubsub = new PubSub();

mongoose.Promise = global.Promise;
// mongoose.set("debug", true);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    poolSize: 2,
    serverSelectionTimeoutMS: 2000,
    socketTimeoutMS: 10000
  })
  .then(() => console.log(`MongoDB connected at ${process.env.MONGO_URI}`))
  .catch((error) => console.log(error));

const { ObjectId } = mongoose.Types;
ObjectId.prototype.valueOf = function () {
  return this.toString();
};

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
  res.header({"Access-Control-Allow-Origin": "*"});

  const { token } = req.cookies;
  if (token) {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
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
      let user;

      if (connection) {
        return {
          ...connection.context,
          pubsub
        };
      }
      else {
        const token = req.headers.authorization || null;

        if (!token) {
          return { User, req, res, pubsub, user };
        }

        var parts = req.headers.authorization.split(' ');
        if (parts.length === 2) {

          var scheme = parts[0];
          var credentials = parts[1];

          if (/^Bearer$/i.test(scheme)) {
            var cred = credentials;
            user = jwt.verify(cred, process.env.JWT_SECRET);
          }
        }

      const subUser = connection ? connection.context.subUser : null;
      return { User, Practice, Appointment, Patient, MedicalRecord, Note, req, res, pubsub, subUser, user };
    }
  },
  // Subscriptions are GraphQL operations that watch events emitted from Apollo Server.
  subscriptions: {
    onConnect: async (params, socket) => {
      const token = params.authToken;

      if (token) {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        if (user) {
          return Object.assign({}, socket.upgradeReq, { subUser: user });
        }
      }
      throw new Error("User is missing auth token.");
    },
  },
});

const endpoint =
  process.env.NODE_ENV === "development"
    ? `http://${process.env.CLIENT_URI}`
    : `https://${process.env.CLIENT_URI}`;

graphQLServer.applyMiddleware({
  app,
  path: "/graphql",
  bodyParserConfig: {
    limit: '200mb',
  },
  cors: { origin: endpoint, credentials: true },
});

const subscriptionEndpoint =
  process.env.NODE_ENV === "development"
    ? `ws://${process.env.SERVER_URI}${graphQLServer.graphqlPath}`
    : `wss://${process.env.SERVER_URI}${graphQLServer.graphqlPath}`;

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
