import gql from 'graphql-tag'

const PATIENT_FRAGMENT = gql`
  fragment patient on Patient {
    _id
    name
    age
    sex
    weight
    doctor
    recent_heart_events
    diabetes
    current_health_assessment
    crp
    phone_number
    notes {
      _id
      patient {
        _id
      }
      date
      text
      sender {
        _id
      }
    }
  }
`;

export default PATIENT_FRAGMENT;
