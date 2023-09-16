const Note = ({ note, toggleNoteImportance }) => {
  const label = note.important ? 'make not important' : 'make important'

  return (
    <li className="note">
      {note.content} <button onClick={toggleNoteImportance}>{label}</button>
    </li>
  )
}

export default Note
