import gql from "graphql-tag";

const POST_NOTE = gql`
  mutation postNote($patient: String!, $text: String!, $date: String) {
    postNote(patient: $patient, text: $text, date: $date) {
      _id
      patient {
        _id
      }
      date
      text
      sender {
        _id
        username
        email
      }
    }
  }
`;

export default POST_NOTE;
