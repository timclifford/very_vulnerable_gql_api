import gql from "graphql-tag";

const CURRENT_USERS_QUERY = gql`
  query {
    users {
      _id
      username
      display_name
      practice {
        name
        address
        phone_number
      }
      email
      password
      resetToken
      resetTokenExpiry
      roles
    }
  }
`;

export default CURRENT_USERS_QUERY;
