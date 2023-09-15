import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()

    const credentials = {
      username,
      password
    }

    login(credentials)
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <div>username <input type="text" name="username" value={username} onChange={({ target }) => setUsername(target.value)} /></div>
          <div>password <input type="text" name="password" value={password} onChange={({ target }) => setPassword(target.value)} /></div>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
}

export default LoginForm