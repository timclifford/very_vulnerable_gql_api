import gql from "graphql-tag";

const NEW_NOTE = gql`
  subscription {
    newNote {
      _id
      patient {
        _id
      }
      text
      sender {
        _id
        username
        email
      }
    }
  }
`;

export default NEW_NOTE;
