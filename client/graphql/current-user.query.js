import gql from "graphql-tag";

const CURRENT_USER_QUERY = gql`
  query {
    me {
      _id
      username
      display_name
      email
      practice {
        _id
        name
        address
        phone_number
      }
      roles
    }
  }
`;

export default CURRENT_USER_QUERY;
