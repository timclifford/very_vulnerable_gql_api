import gql from "graphql-tag";

const DELETE_USER_MUTATION = gql`
  mutation DELETE_USER_MUTATION($input: DeleteUserInput!) {
    deleteUser(input: $input)
  }
`;

export default DELETE_USER_MUTATION;
