import gql from "graphql-tag";
import PATIENT_FRAGMENT from "./fragments/patient.fragment.js";

const PATIENT = gql`
  query PATIENT_QUERY($_id: String) {
    patient(_id: $_id) {
      ...patient
    }
  }
  ${PATIENT_FRAGMENT}
`;

export default PATIENT;
