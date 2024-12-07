import React, { useState } from 'react';

function Login({ onSwitchToSignup }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { username, password };

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            const data = await response.text();

            if (response.ok) {

                localStorage.setItem('jwtToken', data);
                setMessage('Login successful!');
            } else {
                setMessage(data);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred, please try again.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
            <div>{message}</div>
            <button onClick={onSwitchToSignup}>Don't have an account? Signup</button>
        </div>
    );
}

export default Login;
