// src/screens/ProblemPage.tsx
import React from "react";
import biasImg from "../assets/bias-example.png";
import "./LandingPage.css";

const ProblemPage = () => {
  return (
    <div className="section-page">
      <h1 className="section-title">🚨 The Problem</h1>
      <p className="section-paragraph">
        AI is increasingly used to screen job candidates. But models trained on
        historical data often reflect and amplify real-world bias. For instance,
        candidates with identical qualifications may receive different scores
        based on gendered language, gaps in employment, or inferred race.
      </p>
      <img src={biasImg} alt="Bias illustration" className="section-image" />
      <p className="section-paragraph">
        One major tech company reportedly built a system that "learned" to favor resumes
        with certain male-coded terms. Another was found to discard resumes from candidates
        with college names historically associated with underrepresented groups.
      </p>
    </div>
  );
};

export default ProblemPage;
