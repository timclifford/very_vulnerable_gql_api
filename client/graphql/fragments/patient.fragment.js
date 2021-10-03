import gql from 'graphql-tag'

const PATIENT_FRAGMENT = gql`
  fragment patient on Patient {
    _id
    name
    address
    phone_number
    practice {
      _id
      name
      address
    }
    doctor
    medical_record {
      age
      sex
      weight
      recent_heart_events
      diabetes
      current_health_assessment
      crp
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
  }
`;

export default PATIENT_FRAGMENT;
