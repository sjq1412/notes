import React, { useState } from 'react'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

  const handleChangeInput = (event) => {
    setNewNote(event.target.value)
  }

  const addNote = async (event) => {
    event.preventDefault()

    const noteObject = {
      content: newNote,
      important: true,
    }

    createNote(noteObject)
    setNewNote('')
  }

  return (
    <div>
      <form onSubmit={addNote}>
        <input placeholder='a new note...' value={newNote} onChange={handleChangeInput} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default NoteForm