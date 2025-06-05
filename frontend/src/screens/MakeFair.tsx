import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useModelContext } from "../contexts/ModelContext";
import "./EvaluatePage.css"; // reuse styling from evaluate
import robotImg from "../assets/robot2.png";

const MakeFairPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
  const { modelFile } = useModelContext();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsTyping(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="evaluate-page-container">
      <div className="stepper">
        <div className="step active">1. Upload</div>
        <div className="step active">2. Evaluate</div>
        <div className="step current">3. Make Fair</div>
      </div>

      <h2 className="title">Make Your Model Fair</h2>

      <div className="model-card">
        <p><strong>MODEL:</strong> {modelFile?.name || "No model uploaded"}</p>
        <p><strong>DETECTED ISSUE:</strong> 32% disparity for female applicants</p>
      </div>

      <div className="charts-section">
        <div className="chart-card">
          <img src={robotImg} alt="Robot" className="robot-img" />
          
          {isTyping ? (
            <p className="typing-text">Analyzing disparities in your model...</p>
          ) : submitted ? (
            <>
              <p className="success-message">
                ✅ Debiasing request received. We'll notify you when it's done.
              </p>
              <button className="next-btn" onClick={() => navigate("/")}>
                ⬅ Back to Home
              </button>
            </>
          ) : (
            <>
              <p className="summary-text">
                Want us to try debiasing this model?
              </p>
              <button className="view-dashboard-btn" onClick={handleSubmit}>
                ✅ Yes, Make It Fair
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MakeFairPage;
