import { useState, useEffect } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    noteService.getAll().then((initialNotes) => setNotes(initialNotes));
  }, []);

  const addNote = (event) => {
    event.preventDefault();

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };

  const handleChangeInput = (event) => {
    setNewNote(event.target.value);
  };

  const toggleNoteImportance = (id) => {
    const note = notes.find((note) => note.id === id);
    const noteObject = { ...note, important: !note.important };

    noteService
      .update(id, noteObject)
      .then((returnedNote) =>
        setNotes(notes.map((n) => (n.id !== id ? n : returnedNote)))
      )
      .catch((error) => {
        console.log(error);
        alert(`The note "${note.content}" does not exist in the server`);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const notesToDisplay = showAll
    ? notes
    : notes.filter((note) => note.important);

    const handleLogin = (event) => {
      event.preventDefault()
      setUsername('')
      setPassword('')
      console.log({username, password})
    }

  const loginForm = <form onSubmit={handleLogin}>
    <div>
      <div>username <input type="text" name="username" value={username} onChange={({target}) => setUsername(target.value)} /></div>
      <div>password <input type="text" name="password" value={password} onChange={({target}) => setPassword(target.value)} /></div>
    </div>
    <button type="submit">login</button>
  </form>

  return (
    <div>
      <h1>Notes</h1>
      <h2>Login</h2>
      {loginForm}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToDisplay.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleNoteImportance={() => toggleNoteImportance(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleChangeInput} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
