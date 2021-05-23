const Subscription = {
  newNote: {
    subscribe: (parent, args, { pubsub, subUser }) => {
      if (subUser) {
        return pubsub.asyncIterator("note-added");
      }
      throw new Error("User is not authenticated");
    }
  }
};

module.exports = Subscription;
