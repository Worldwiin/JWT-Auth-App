import React, { useState } from 'react';

function Signup({ onSwitchToLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { username, password, email };

        try {
            const response = await fetch('http://localhost:8080/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            const data = await response.text();

            if (response.ok) {
                setMessage('Signup successful! You can now login.');
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
            <h2>Signup</h2>
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
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <button type="submit">Signup</button>
                </div>
            </form>
            <div>{message}</div>
            <button onClick={onSwitchToLogin}>Already have an account? Login</button>
        </div>
    );
}

export default Signup;
