import gql from "graphql-tag";
import APPOINTMENT_FRAGMENT from "./fragments/appointment.fragment.js";

const APPOINTMENT = gql`
  query APPOINTMENT_QUERY($_id: String) {
    appointment(_id: $_id) {
      ...appointment
    }
  }
  ${APPOINTMENT_FRAGMENT}
`;

export default APPOINTMENT;
