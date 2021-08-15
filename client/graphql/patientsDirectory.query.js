import gql from "graphql-tag";

const PATIENTS_DIRECTORY = gql`
  query PATIENTS_DIRECTORY_QUERY($practice: String!) {
    patientsDirectory(practice: $practice) {
      _id
      name
      address
      practice {
        _id
        name
        address
        phone_number
      }
      phone_number
      doctor
    }
  }
`;

export default PATIENTS_DIRECTORY;
