import gql from "graphql-tag";

const PATIENT_ADD_MUTATION = gql`
  mutation addPatient(
    $name: String!,
    $age: Int!,
    $sex: String!,
    $weight: String!,
    $recent_heart_events: Boolean,
    $current_health_assessment: HealthRisk,
    $diabetes: Boolean,
    $crp: CRPStatus,
    $phone_number: String,
    $doctor: String!
  ) {
    addPatient(
      name: $name,
      age: $age,
      sex: $sex,
      weight: $weight,
      recent_heart_events: $recent_heart_events,
      current_health_assessment: $current_health_assessment,
      diabetes: $diabetes,
      crp: $crp,
      phone_number: $phone_number,
      doctor: $doctor
    ) {
      _id
      name
      sex
      weight
      recent_heart_events
      current_health_assessment
      diabetes
      crp
      phone_number
      doctor
    }
  }
`;

export default PATIENT_ADD_MUTATION;
