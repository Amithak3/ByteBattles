import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { API_SERVER_URL } from "../configs/themeConfig";
import "./ProblemDetail.css";

function ProblemDetail() {
  const { code } = useParams();
    const [problem, setProblem] = useState(null);
    const [codeInput, setCodeInput] = useState('');
    const [selectedLang, setSelectedLang] = useState('python');
    const [submitted, setSubmitted] = useState(false);
    const [responseOutput, setResponseOutput] = useState('');

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');

        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
};
axios
    .get('http://${API_SERVER_URL}/problem/${code}', config)
    .then((response) => {
        setProblem(response.data);
    })
    .catch((error) => {
        console.error('Error fetching problem', error);
    });
}, [code]);

const handleSubmit =  () => {
    setSubmitting(true);
    console.log('submitting code in selected language', codeInput, selectedLang);
    const formData = new URLSearchParams();
    formData.append('language', selectedLang);
    formData.append('problem_code', code);
    formData.append('code', codeInput);

    const accessToken = localStorage.getItem('accessToken');

    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };

    axios
        .post('http://${API_SERVER_URL}/submit/', formData, config)
        .then((response) => {
            console.log('Submission response', response.data);
            setResponseOutput(response.data.output);
        })
        .catch((error) => {
            console.error('Error submitting code', error);
        })
        .finally(() => {
            setCodeInput('');
            setSubmitting(false);
        });
    };

    if (!problem) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="problem-detail-container">
          <h2 className="problem-detail-title">{problem.name}</h2>
          <div className="problem-detail-content">
            <div className="problem-statement">{problem.statement}</div>
          </div>
          {/* <div className="problem-detail-content"> */}
          <div className="language-select">
            <label htmlFor="language">Select Language:</label>
            <select
              id="language"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              <option value="c">C</option>
              <option value="cpp">C++</option>
              <option value="py">Python</option>
            </select>
          </div>
          <textarea
            className="code-input"
            placeholder="Enter your code here..."
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
          />
          <button
            className="submit-button"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
          {/* Display response output */}
          {responseOutput && (
            <div>
              <h2>Output:</h2>
              <pre>{responseOutput}</pre>
            </div>
          )}
        </div>
      );
    }

    export default ProblemDetail;