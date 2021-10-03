import gql from 'graphql-tag'

const APPOINTMENT_FRAGMENT = gql`
  fragment appointment on Appointment {
      _id
      patient {
        _id
        name
      }
      doctor {
        display_name
        username
      }
      practice {
        name
      }
      booked_by {
        display_name
      }
      date
  }
`;

export default APPOINTMENT_FRAGMENT;
