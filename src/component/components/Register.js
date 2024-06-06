import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: ''
    });

    const { name, email, password, phoneNumber } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        const newUser = {
            name,
            email,
            password,
            phoneNumber
        };

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const body = JSON.stringify(newUser);

            const res = await axios.post('http://localhost:3001/api/auth/register', body, config);
            console.log(res.data);
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <input type="text" placeholder="Name" name="name" value={name} onChange={onChange} required />
                </div>
                <div>
                    <input type="email" placeholder="Email" name="email" value={email} onChange={onChange} required />
                </div>
                <div>
                    <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} required />
                </div>
                <div>
                    <input type="text" placeholder="Phone Number" name="phoneNumber" value={phoneNumber} onChange={onChange} required />
                </div>
                <input type="submit" value="Register" />
            </form>
        </div>
    );
};

export default Register;
