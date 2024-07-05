import React, { useState } from 'react';
import axios from 'axios';
import './CreateProblem.css';

const CreateProblem = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('easy');
    const [testcases, setTestcases] = useState([{ input: '', output: '' }]);
    const [message, setMessage] = useState('');
    const [problemId, setProblemId] = useState(null);

    const handleAddTestcase = () => {
        setTestcases([...testcases, { input: '', output: '' }]);
    };

    const handleTestcaseChange = (index, field, value) => {
        const newTestcases = [...testcases];
        newTestcases[index][field] = value;
        setTestcases(newTestcases);
    };

    const handleCreateProblem = async (e) => {
        e.preventDefault();
        try {
            // Create the problem
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

    const handleSubmitTestcases = async (e) => {
        e.preventDefault();
        try {
            // Create test cases
            for (const testcase of testcases) {
                await axios.post('http://127.0.0.1:8000/problems/testcases-api/', {
                    problem: problemId,
                    input: testcase.input,
                    output: testcase.output
                });
            }

            setMessage('Test cases created successfully!');
        } catch (error) {
            console.error('Error creating test cases:', error.response);
            setMessage('Failed to create test cases.');
        }
    };

    return (
        <div className="create-problem-page">
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
                <form onSubmit={handleSubmitTestcases} className="create-problem-form">
                    <div className="testcases-section">
                        <h2>Test Cases</h2>
                        {testcases.map((testcase, index) => (
                            <div key={index} className="form-group">
                                <label>Input</label>
                                <textarea
                                    value={testcase.input}
                                    onChange={(e) =>
                                        handleTestcaseChange(index, 'input', e.target.value)
                                    }
                                    required
                                />
                                <label>Output</label>
                                <textarea
                                    value={testcase.output}
                                    onChange={(e) =>
                                        handleTestcaseChange(index, 'output', e.target.value)
                                    }
                                    required
                                />
                            </div>
                        ))}
                        <button type="button" onClick={handleAddTestcase}>
                            Add Test Case
                        </button>
                    </div>
                    <button type="submit" className="submit-button">Submit Test Cases</button>
                </form>
            )}
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default CreateProblem;
