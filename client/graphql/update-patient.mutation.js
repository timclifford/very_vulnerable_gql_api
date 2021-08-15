import gql from "graphql-tag";
import PATIENT_FRAGMENT from "./fragments/patient.fragment.js";

const UPDATE_PATIENT_MUTATION = gql`
  mutation UPDATE_PATIENT_MUTATION($input: UpdatePatientInput!) {
    updatePatient(input: $input) {
      ...patient
    }
  }
  ${PATIENT_FRAGMENT}
`;

export default UPDATE_PATIENT_MUTATION;
