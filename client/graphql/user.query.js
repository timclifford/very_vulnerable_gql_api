import gql from "graphql-tag";
import USER_FRAGMENT from "./fragments/user.fragment.js";

const USER_QUERY = gql`
  query USER_QUERY($_id: String) {
    user(_id: $_id) {
      ...user
    }
  }
  ${USER_FRAGMENT}
`;

export default USER_QUERY;
