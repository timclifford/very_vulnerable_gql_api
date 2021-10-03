import gql from "graphql-tag";

const APPOINTMENT_ADD_MUTATION = gql`
  mutation addAppointment(
    $patient: String!
    $date: String!
    $booked_by: String
    $doctor: String
  ) {
    addAppointment(
      patient: $patient,
      date: $date,
      booked_by: $booked_by,
      doctor: $doctor
    ) {
      _id
      date
      patient {
        _id
      }
      doctor {
        _id
      }
      booked_by {
        display_name
      }
    }
  }
`;

export default APPOINTMENT_ADD_MUTATION;
