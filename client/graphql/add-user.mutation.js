import gql from "graphql-tag";

const USER_ADD_MUTATION = gql`
  mutation addUser(
    $username: String!
    $display_name: String
    $email: String!
    $password: String!
    $practice: String
    $roles: [String!]!
  ) {
    addUser(
      username: $username
      display_name: $display_name
      email: $email
      password: $password
      practice: $practice
      roles: $roles
    ) {
      token
    }
  }
`;

export default USER_ADD_MUTATION;
