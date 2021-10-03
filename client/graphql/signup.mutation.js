import gql from "graphql-tag";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $username: String!
    $display_name: String!
    $email: String!
    $password: String!
    $passwordConfirm: String!
  ) {
    signupUser(
      email: $email
      username: $username
      display_name: $display_name
      password: $password
      passwordConfirm: $passwordConfirm
      roles: ["user"]
    ) {
      token
    }
  }
`;

export default SIGNUP_MUTATION;
