import gql from 'graphql-tag'

const USER_FRAGMENT = gql`
  fragment user on User {
    _id
    username
    display_name
    email
    password
    resetToken
    resetTokenExpiry
    practice {
      _id
      name
    }
    roles
  }
`;

export default USER_FRAGMENT;
