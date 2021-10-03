import gql from "graphql-tag";

const MEDICAL_RECORD_ADD_MUTATION = gql`
  mutation addMedicalRecord(
    $patient: String!
    $age: Int
    $sex: String
    $weight: String
    $recent_heart_events: Boolean
    $current_health_assessment: HealthRisk
    $diabetes: Boolean
    $crp: CRPStatus
  ) {
    addMedicalRecord(
      patient: $patient,
      age: $age,
      sex: $sex,
      weight: $weight,
      recent_heart_events: $recent_heart_events,
      current_health_assessment: $current_health_assessment,
      diabetes: $diabetes
      crp: $crp
    ) {
      _id
      patient {
        name
      }
      age
      sex
      weight
      recent_heart_events
      current_health_assessment
      diabetes
      crp
    }
  }
`;

export default MEDICAL_RECORD_ADD_MUTATION;
