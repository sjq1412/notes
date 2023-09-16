import '@testing-library/jest-dom'
import { screen, render } from '@testing-library/react'
import Note from './Note'

describe('Note component', () => {
  test('renders content', () => {
    const note = { content: 'this is a note', important: true }
    render(<Note note={note} />)

    const content = screen.getByText('this is a note')
    expect(content).toBeDefined()
  })
})