import gql from "graphql-tag";

const PATIENT_ADD_MUTATION = gql`
  mutation addPatient(
    $name: String!,
    $address: String,
    $phone_number: String,
    $practice: String,
    $doctor: String!,
  ) {
    addPatient(
      name: $name,
      address: $address
      phone_number: $phone_number
      practice: $practice
      doctor: $doctor
    ) {
      _id
      name
      address
      phone_number
      doctor
    }
  }
`;

export default PATIENT_ADD_MUTATION;
