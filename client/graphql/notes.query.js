import gql from "graphql-tag";

const NOTES = gql`
query NOTES_QUERY($patientId: String!) {
  notes(patientId: $patientId) {
      _id
      patient {
        _id
      }
      sender {
        _id
        username
      }
      date
      text
    }
  }
`;

export default NOTES;
