import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Note from './Note'

describe('Note component', () => {
  test('renders content', () => {
    const note = { content: 'this is a note', important: true }
    const { container } = render(<Note note={note} />)

    const div = container.querySelector('.note')
    expect(div).toHaveTextContent('this is a note')
  })
})