import React, { useState } from 'react';
import axios from 'axios';

const Login2 = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        const user = {
            email,
            password
        };

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const body = JSON.stringify(user);

            const res = await axios.post('http://localhost:3001/api/auth/login', body, config);
            const token = res.data
            localStorage.setItem('token', token);
            onLogin(token)
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <input type="email" placeholder="Email" name="email" value={email} onChange={onChange} required />
                </div>
                <div>
                    <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} required />
                </div>
                <input type="submit" value="Login" />

            </form>
        </div>
    );
};

export default Login2;
