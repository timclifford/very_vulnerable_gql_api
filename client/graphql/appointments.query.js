import gql from "graphql-tag";

const APPOINTMENTS = gql`
  query APPOINTMENTS_QUERY($practice: String) {
    appointments(practice: $practice) {
      _id
      patient {
        _id
        name
        address
        phone_number
      }
      doctor {
        display_name
        username
      }
      practice {
        _id
        name
        address
        phone_number
      }
      booked_by {
        display_name
      }
      date
    }
  }
`;

export default APPOINTMENTS;
