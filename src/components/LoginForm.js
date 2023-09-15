import React from 'react'

const LoginForm = ({
    handleLogin,
    username,
    password,
    setUsername,
    setPassword
}) => {
  return (
    <div>
        <form onSubmit={handleLogin}>
            <div>
                <div>username <input type="text" name="username" value={username} onChange={({target}) => setUsername(target.value)} /></div>
                <div>password <input type="text" name="password" value={password} onChange={({target}) => setPassword(target.value)} /></div>
            </div>
            <button type="submit">login</button>
        </form>
    </div>
  )
}

export default LoginForm