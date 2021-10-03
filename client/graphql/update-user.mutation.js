import gql from "graphql-tag";
import USER_FRAGMENT from "./fragments/user.fragment.js";

const UPDATE_USER_MUTATION = gql`
  mutation UPDATE_USER_MUTATION($input: UpdateUserInput!) {
    updateUser(input: $input) {
      ...user
    }
  }
  ${USER_FRAGMENT}
`;

export default UPDATE_USER_MUTATION;
