import React from 'react'

const NoteForm = ({
    addNote,
    newNote,
    handleChangeInput
}) => {
  return (
    <div>
        <form onSubmit={addNote}>
            <input value={newNote} onChange={handleChangeInput} />
            <button type="submit">save</button>
        </form>
    </div>
  )
}

export default NoteForm