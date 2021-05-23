import gql from "graphql-tag";
import PATIENT_FRAGMENT from "./fragments/patient.fragment.js";

const APPOINTMENTS = gql`
  query APPOINTMENTS_QUERY {
    appointments {
      _id
      patient {
        ...patient
      }
      doctor {
        display_name
      }
      practice {
        name
      }
      booked_by {
        display_name
      }
      date
    }
  }
  ${PATIENT_FRAGMENT}
`;

export default APPOINTMENTS;
