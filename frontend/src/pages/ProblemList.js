import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './ProblemList.css';

const ProblemList = () => {
    const [problems, setProblems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/problems/problemset/');
                setProblems(response.data);
            } catch (error) {
                console.error('Error fetching problems:', error);
            }
        };

        fetchProblems();
    }, []);

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
                        Create Problem
                    </button>
                </div>
                <ul className="problem-list">
                    {problems.map((problem) => (
                        <li key={problem.id} className="problem-item">
                            <h2>{problem.name}</h2>
                            <span className={`difficulty ${problem.difficulty}`}>{problem.difficulty}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProblemList;
