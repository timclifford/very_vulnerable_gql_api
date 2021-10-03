import gql from "graphql-tag";
import APPOINTMENT_FRAGMENT from "./fragments/appointment.fragment.js";

const UPDATE_APPOINTMENT_MUTATION = gql`
  mutation UPDATE_APPOINTMENT_MUTATION($input: UpdateAppointmentInput!) {
    updateAppointment(input: $input) {
      ...appointment
    }
  }
  ${APPOINTMENT_FRAGMENT}
`;

export default UPDATE_APPOINTMENT_MUTATION;
