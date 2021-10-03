import gql from "graphql-tag";

const PATIENTS = gql`
  query PATIENTS_QUERY($doctor: String) {
    patients(doctor: $doctor) {
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

export default PATIENTS;
