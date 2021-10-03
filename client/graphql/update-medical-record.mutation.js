import gql from "graphql-tag";

const UPDATE_MEDICAL_RECORD_MUTATION = gql`
  mutation UPDATE_MEDICAL_RECORD_MUTATION($input: UpdateMedicalRecordInput!) {
    updateMedicalRecord(input: $input) {
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

export default UPDATE_MEDICAL_RECORD_MUTATION;
