import { useState } from "react"
import Note from "./components/Note"

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState("a new note...")
  const [showAll, setShowAll] = useState(true)

  const addNote = event => {
    event.preventDefault()

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1
    }

    setNotes(notes.concat(noteObject))
    setNewNote("")
  }

  const handleChangeInput = (event) => {
    setNewNote(event.target.value)
  }

  const notesToDisplay = showAll ? notes : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToDisplay.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleChangeInput} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App