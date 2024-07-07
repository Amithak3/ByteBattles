import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import './Submissions.css';

const Submissions = () => {
    const { id } = useParams();
    const [submissions, setSubmissions] = useState([]);
    const [selectedSubmission, setSelectedSubmission] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/problems/problems-api/${id}/submissions/`);
                setSubmissions(response.data);
            } catch (error) {
                console.error('Error fetching submissions:', error);
            }
        };

        fetchSubmissions();
    }, [id]);

    const handleSubmissionClick = async (submissionId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/compiler/submissions/${submissionId}/`);
            setSelectedSubmission(response.data);
            setShowModal(true);
        } catch (error) {
            console.error('Error fetching submission details:', error);
        }
    };

    const formatDateTime = (datetime) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return new Date(datetime).toLocaleDateString(undefined, options);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedSubmission(null);
    };

    return (
        <div className="submissions-page">
            <Header />
            <div className="submissions-content">
                <h1>Submissions</h1>
                <div className="submissions-list">
                    {submissions.map((submission) => (
                        <div key={submission.id} className="submission-item" onClick={() => handleSubmissionClick(submission.id)}>
                            <p><strong>Username:</strong> {submission.username}</p>
                            <p><strong>Language:</strong> {submission.language}</p>
                            <p><strong>Submitted At:</strong> {formatDateTime(submission.submitted_at)}</p>
                        </div>
                    ))}
                </div>
                {showModal && selectedSubmission && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close-button" onClick={closeModal}>&times;</span>
                            <h2>Submission Details</h2>
                            <p><strong>Username:</strong> {selectedSubmission.username}</p>
                            <p><strong>Language:</strong> {selectedSubmission.language}</p>
                            <p><strong>Result:</strong> {selectedSubmission.result}</p>
                            <p><strong>Submitted At:</strong> {formatDateTime(selectedSubmission.submitted_at)}</p>
                            <h3>Code</h3>
                            <pre>{selectedSubmission.code}</pre>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Submissions;
