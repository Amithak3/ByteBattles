import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import './CreateProblem.css';

const CreateProblem = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        difficulty: 'easy',
        testcases: [{ input: '', output: '' }]
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleTestcaseChange = (index, e) => {
        const { name, value } = e.target;
        const newTestcases = [...formData.testcases];
        newTestcases[index][name] = value;
        setFormData({
            ...formData,
            testcases: newTestcases
        });
    };

    const addTestcase = () => {
        setFormData({
            ...formData,
            testcases: [...formData.testcases, { input: '', output: '' }]
        });
    };

    const removeTestcase = (index) => {
        const newTestcases = [...formData.testcases];
        newTestcases.splice(index, 1);
        setFormData({
            ...formData,
            testcases: newTestcases
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('accessToken');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            await axios.post('http://127.0.0.1:8000/problems/create/', formData, config);
            navigate('/problems');
        } catch (error) {
            console.error('Error creating problem:', error);
        }
    };

    return (
        <div className="create-problem-page">
            <Header />
            <div className="create-problem-content">
                <h1>Create Problem</h1>
                <form onSubmit={handleSubmit}>
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
                        Description
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </label>
                    <label>
                        Difficulty
                        <select
                            name="difficulty"
                            value={formData.difficulty}
                            onChange={handleChange}
                        >
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </label>
                    <div className="testcases">
                        <h2>Test Cases</h2>
                        {formData.testcases.map((testcase, index) => (
                            <div key={index} className="testcase">
                                <label>
                                    Input
                                    <textarea
                                        name="input"
                                        value={testcase.input}
                                        onChange={(e) => handleTestcaseChange(index, e)}
                                        required
                                    ></textarea>
                                </label>
                                <label>
                                    Output
                                    <textarea
                                        name="output"
                                        value={testcase.output}
                                        onChange={(e) => handleTestcaseChange(index, e)}
                                        required
                                    ></textarea>
                                </label>
                                {formData.testcases.length > 1 && (
                                    <button
                                        type="button"
                                        className="remove-testcase"
                                        onClick={() => removeTestcase(index)}
                                    >
                                        Remove Testcase
                                    </button>
                                )}
                            </div>
                        ))}
                        <button type="button" className="add-testcase" onClick={addTestcase}>
                            Add Testcase
                        </button>
                    </div>
                    <button type="submit">Create</button>
                </form>
            </div>
        </div>
    );
};

export default CreateProblem;
