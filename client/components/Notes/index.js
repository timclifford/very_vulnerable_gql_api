import { useQuery } from "@apollo/client";
import NoteList from "./NoteList";
import NOTES from "../../graphql/notes.query";
import NEW_NOTE from "../../graphql/new-note.subscription";

const Notes = (patient) => {
  const { data, loading, error, subscribeToMore } = useQuery(NOTES,  {
    variables: { patientId: patient.patient._id },
  });
  if (loading) {
    return <p className="py-4">Loading...</p>;
  }
  if (error) {
    return <p>Error: {JSON.stringify(error.message)}</p>;
  }
  const subscribeToNewNotes = () =>
    subscribeToMore({
      document: NEW_NOTE,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return;
        const newNote = subscriptionData.data.newNote;
        return Object.assign({}, prev, {
          notes: [newNote, ...prev.notes]
        });
      }
    });
  return (
    <NoteList data={data} subscribeToNewNotes={subscribeToNewNotes} />
  );
};

export default Notes;
