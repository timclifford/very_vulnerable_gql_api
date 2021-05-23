import gql from "graphql-tag";

const PATIENTS = gql`
  query PATIENTS_QUERY($doctor: String) {
    patients(doctor: $doctor) {
      _id
      name
      age
      weight
      sex
      doctor
    }
  }
`;

export default PATIENTS;
