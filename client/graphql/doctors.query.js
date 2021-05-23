import gql from "graphql-tag";

const DOCTORS = gql`
  query DOCTORS_QUERY {
    doctors {
      _id
      username
    }
  }
`;

export default DOCTORS;
