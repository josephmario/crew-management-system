import React, { useState } from 'react';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate email and password
        if (!validateEmail(email)) {
            setError('Email must be a string with maximum 10 characters.');
            return;
        }

        if (!validatePassword(password)) {
            setError('Password must not contain special characters and have maximum 20 characters.');
            return;
        }

        // Call login API here
        const response = await fetch('http://localhost:8000/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            // Handle successful login
            console.log('Login successful');
            const data = await response.json();
            const token = data.token;
            localStorage.setItem('token', token);
            setError('');
        } else {
            // Handle login failure
            console.error('Login failed');
            setError('Invalid email or password.');
        }
    };

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,10}$/.test(email);
    };

    const validatePassword = (password) => {
        return /^[a-zA-Z0-9]{1,20}$/.test(password);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Login</h2>
                            {error && <p className="text-danger">{error}</p>}
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password:</label>
                                    <input type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <button type="submit" className="btn btn-primary">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
