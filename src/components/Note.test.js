import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'

describe('Note component', () => {
  test('renders content', () => {
    const note = { content: 'this is a note', important: true }
    const { container } = render(<Note note={note} />)

    const div = container.querySelector('.note')

    // screen.debug(div)
    expect(div).toHaveTextContent('this is a note')
  })

  test('clicking the button calls event handler once', async () => {
    const note = { content: 'this is a note', important: true }

    const mockHandler = jest.fn()

    render(<Note note={note} toggleNoteImportance={mockHandler} />)

    const user = userEvent.setup()
    const button = screen.getByText('make not important')
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
  })
})