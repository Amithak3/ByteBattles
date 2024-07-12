import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './ProblemList.css';
import  API_SERVER_URL  from '../configs/config';  // Assuming this is a named export

const ProblemList = () => {
    const [problems, setProblems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const response = await axios.get(`${API_SERVER_URL}/problems/problems-api/`);
                setProblems(response.data);
            } catch (error) {
                console.error('Error fetching problems:', error);
            }
        };

        fetchProblems();
    }, []);

    const handleProblemClick = (id) => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            console.error('No access token found');
            navigate('/signin');  // Redirect to login if token is not found
            return;
        }
        navigate(`/problems/${id}`);
    };

    return (
        <div className="problem-list-page">
            <Header />
            <div className="problem-list-content">
                <div className="problem-list-header">
                    <h1>Problems</h1>
                    <button
                        className="create-problem-button"
                        onClick={() => navigate('/create-problem')}
                    >
                        Create Problems
                    </button>
                </div>
                <ul className="problem-list">
                    {problems.map((problem) => (
                        <li
                            key={problem.id}
                            className="problem-item"
                            onClick={() => handleProblemClick(problem.id)}
                        >
                            <h3>{problem.name}</h3>
                            <span className={`difficulty ${problem.difficulty}`}>{problem.difficulty}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProblemList;
