import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './ProblemDetail.css';

const ProblemDetail = () => {
    const { id } = useParams();
    const [problem, setProblem] = useState(null);
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('python');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/problems/problems-api/${id}/`);
                setProblem(response.data);
            } catch (error) {
                console.error('Error fetching problem:', error);
            }
        };

        fetchProblem();
    }, [id]);

    const handleRun = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            console.error('No access token found');
            navigate('/signin');  // Redirect to login if token is not found
            return;
        }

        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/compiler/run/',
                {
                    language,
                    code,
                    input
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setOutput(response.data.output); // Update output state with response data
        } catch (error) {
            console.error('Error running code:', error);
            setOutput('Error running code');
        }
    };

    const handleSubmit = async () => {
        // console.log('id=', id);
        const token = localStorage.getItem('accessToken');
        if (!token) {
            console.error('No access token found');
            navigate('/login');  // Redirect to login if token is not found
            return;
        }
        // console.log('user=', localStorage.getItem('username'));

        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/compiler/submit/',
                {
                    
                    problem_id: id, 
                    username: localStorage.getItem('username'), 
                    code,
                    language,
                    verdict: '', // Leave empty, server should populate this
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setOutput(`Result: ${response.data.result}`); // Update output state with submission details
        } catch (error) {
            console.error('Error submitting code:', error);
            setOutput('Error submitting code');
        }
    };

    if (!problem) return <div>Loading...</div>;

    return (
        <div className="problem-detail-page">
            <Header />
            <div className="problem-detail-content">
                <div className="problem-detail-section">
                    <h1>{problem.name}</h1>
                    <p>{problem.description}</p>
                </div>
                <div className="code-editor-section">
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    >
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                        <option value="c++">C++</option>
                    </select>
                    <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Write your code here"
                    />
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Input for the code"
                    />
                    <button className="run-button" onClick={handleRun}>Run</button>
                    <button className="submit-button" onClick={handleSubmit}>Submit</button>
                </div>
                <div className="output-section">
                    <h2>Output</h2>
                    <pre>{output}</pre>
                </div>
            </div>
        </div>
    );
};

export default ProblemDetail;
