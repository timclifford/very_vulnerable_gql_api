import { useMutation } from "@apollo/react-hooks";
import { Card, CardBody, Form, FormGroup, Input } from "reactstrap";
import POST_NOTE from "../../graphql/post-note.mutation";

const NoteForm = (patient) => {
  const [postNote] = useMutation(POST_NOTE);
  const { _id, name } = patient && patient.patient || null;
  const handleSubmit = evt => {
    evt.preventDefault();
    const text = evt.target.text.value;
    if (!text) return;
    postNote({
      variables: {
        patient: _id,
        date: new Date(),
        text
      }
    });
    evt.target.text.value = "";
  };
  return (
    <Card className="bg-gray-100">
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Input type="textarea" name="text" placeholder="Type a medical note..."/>
          </FormGroup>
          <button type="submit" className="bg-blue-400 hover:bg-blue-500 text-white font-semi-bold text-sm px-4 py-2 rounded">
            Submit
          </button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default NoteForm;
