import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreateProblem.css';
import Header from '../components/Header'; // Import the Header component

const CreateProblem = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('easy');
    const [testcase, setTestcase] = useState({ input: '', output: '' });
    const [message, setMessage] = useState('');
    const [problemId, setProblemId] = useState(null);
    const [createdTestcases, setCreatedTestcases] = useState([]);

    useEffect(() => {
        if (problemId) {
            fetchTestcases();
        }
    }, [problemId]);

    const fetchTestcases = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/problems/problems-api/${problemId}/testcases/`);
            setCreatedTestcases(response.data);
        } catch (error) {
            console.error('Error fetching test cases:', error);
            setMessage('Failed to fetch test cases.');
        }
    };

    const handleCreateProblem = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/problems/problems-api/', {
                name,
                description,
                difficulty
            });

            const newProblemId = response.data.id;
            setProblemId(newProblemId);
            setMessage('Problem created successfully! Now add test cases.');
        } catch (error) {
            console.error('Error creating problem:', error);
            setMessage('Failed to create problem.');
        }
    };

    const handleSubmitTestcase = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/problems/testcases-api/', {
                //eslint-disable-next-line
                problem: `http://127.0.0.1:8000/problems/problems-api/${problemId}/`,
                input: testcase.input,
                output: testcase.output
            });

            setMessage('Test case created successfully!');
            setTestcase({ input: '', output: '' });
            fetchTestcases();
        } catch (error) {
            console.error('Error creating test case:', error.response);
            setMessage('Failed to create test case.');
        }
    };

    return (
        <div className="create-problem-page">
            <Header /> {/* Add the Header component here */}
            <h1>Create Problem</h1>
            {!problemId ? (
                <form onSubmit={handleCreateProblem} className="create-problem-form">
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Difficulty</label>
                        <select
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            required
                        >
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
                    <button type="submit" className="submit-button">Create Problem</button>
                </form>
            ) : (
                <>
                    <form onSubmit={handleSubmitTestcase} className="create-problem-form">
                        <div className="testcase-section">
                            <h2>Add Test Case</h2>
                            <div className="form-group">
                                <label>Input</label>
                                <textarea
                                    value={testcase.input}
                                    onChange={(e) =>
                                        setTestcase({ ...testcase, input: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Output</label>
                                <textarea
                                    value={testcase.output}
                                    onChange={(e) =>
                                        setTestcase({ ...testcase, output: e.target.value })
                                    }
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" className="submit-button">Submit Test Case</button>
                    </form>
                    <div className="created-testcases">
                        <h2>Created Test Cases</h2>
                        {createdTestcases.map((tc, index) => (
                            <div key={index} className="testcase-display">
                                <div><strong>Input:</strong> {tc.input}</div>
                                <div><strong>Output:</strong> {tc.output}</div>
                            </div>
                        ))}
                    </div>
                </>
            )}
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default CreateProblem;
