import { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

class NoteList extends Component {
  componentDidMount() {
    this.props.subscribeToNewNotes();
  }
  render() {
    const { data } = this.props;
    return (
      <ListGroup className="mb-2">
        {data && data.notes.map(note => {
          let date = new Date(note.date);
          return (
            <div key={note._id}>
              <ListGroupItem className="my-2">
                <p className="text-sm italic pb-2"><strong>{note.sender.username}</strong>: {date.toDateString()} {date.toTimeString()}</p>
                <p className="pb-2">{note.text}</p>
              </ListGroupItem>
            </div>
          );
        })}
      </ListGroup>
    );
  }
}

export default NoteList;
