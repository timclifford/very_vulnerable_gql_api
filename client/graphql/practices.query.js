import gql from "graphql-tag";

const PRACTICES = gql`
  query PRACTICES_QUERY {
    practices {
      _id
      name
      address
      phone_number
    }
  }
`;

export default PRACTICES;
