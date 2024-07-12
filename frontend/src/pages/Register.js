// src/pages/Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import Header from '../components/Header';
import "./Register.css";
import API_SERVER_URL from '../configs/config';
const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ 
        username: '',
        name: '',
        age: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_SERVER_URL}/auth/register/`, formData); // Note the trailing slash
            console.log(response.data);
            navigate('/signin');
        } catch (error) {
            console.error("Registration failed: ", error);
            if (error.response && error.response.data) {
                setError(error.response.data.detail || "Registration failed");
            } else {
                setError("An unexpected error occurred");
            }
        }
    };

    return (
        <div className="register-page">
            <Header />
            <div className="register-form-container">
                <h1>Register</h1>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label>
                        Username
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Name
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Age
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Email
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Password
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
