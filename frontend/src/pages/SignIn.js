import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from '../components/Header';
import "./SignIn.css";

const SignIn = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
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
            const response = await axios.post('http://127.0.0.1:8000/auth/login/', formData);
            const { access } = response.data.tokens;
            localStorage.setItem('accessToken', access);
            localStorage.setItem('username', formData.username);
            console.log(response.data);
            navigate('/');
        } catch (error) {
            console.error("Login failed: ", error);
            if (error.response && error.response.data) {
                setError(error.response.data.non_field_errors || error.response.data.detail || "Login failed");
            } else {
                setError("An unexpected error occurred");
            }
        }
    };

    return (
        <div className="signin-page">
            <Header />
            <div className="signin-content">
                <div className="login-form-container">
                    <h1>Login</h1>
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
                            Password
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <button type="submit">Login</button>
                    </form>
                    <button className="register-button" onClick={() => navigate('/register')}>
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
