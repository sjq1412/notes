import { useState, useEffect } from "react";
import Note from "./components/Note";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import NoteForm from "./components/NoteForm";
import noteService from "./services/notes";
import loginService from "./services/login"
import "./index.css"

const App = () => {
  const [notes, setNotes] = useState([]); 
  const [showAll, setShowAll] = useState(true);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({message: null, variant: null})

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (notification.message) {
      setTimeout(() => {
        setNotification({message: null, variant: null})
      }, 3000);
    }
  }, [notification])

  useEffect(() => {
    noteService.getAll().then((initialNotes) => setNotes(initialNotes));
  }, []);

  const addNote = async (noteObject) => {
    try {
      const returnedNote = await noteService.create(noteObject)
    setNotes(notes.concat(returnedNote));
    } catch (exception) {
      console.error({exception})
      setNotification({ message: exception.response.data.error, variant: 'error'})
    }
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
        setNotification({ message: `The note "${note.content}" does not exist in the server`, variant: "error"})
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const notesToDisplay = showAll
    ? notes
    : notes.filter((note) => note.important);

    const handleLogin = async (event) => {
      event.preventDefault()

      try {
        const user = await loginService.login({username, password})
        setUser(user)
        noteService.setToken(user.token)
        window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
        setUsername('')
        setPassword('')
      } catch (exception) {
        console.error({exception})
        setNotification({message: 'Wrong credentials', variant: "error"})
      }
    }

  const loginForm = () => {
    return (
        <Togglable buttonLabel="login">
          <LoginForm handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword} /> 
        </Togglable>
    )
  }

  const noteForm = () => {
    return (
      <Togglable buttonLabel="new note">
        <NoteForm createNote={addNote} />
      </Togglable>
    )
  }

  return (
    <div>
      <Notification message={notification.message} variant={notification.variant} />
      <h1>Notes</h1>
      <h2>Login</h2>
      {!user && loginForm()}
      {user && <div>
          <p>{user.name} logged in <button onClick={() =>{ 
              window.localStorage.removeItem('loggedNoteappUser')
              setUser(null)
            }}>logout</button></p>
          {noteForm()}
        </div>}
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
    </div>
  );
};

export default App;
