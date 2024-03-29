import React, { useState } from 'react'

function LoginPage() {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');


    async function login(e) {
        e.preventDefault();
        await fetch('http://localhost:4000/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
            credentials:'include'
        })
    }

    return (
        <form className='login' onSubmit={login}>
            <h1>Login</h1>
            <input type="text" placeholder='username' value={username} onChange={e => setUserName(e.target.value)} />
            <input type="password" placeholder='password' value={password} onChange={e => setPassword(e.target.value)} />
            <button>Login</button>
        </form>
    )
}

export default LoginPage