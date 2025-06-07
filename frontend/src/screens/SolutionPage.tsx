// src/screens/SolutionPage.tsx
import React from "react";
import equityImg from "../assets/equity.png"; // ✅ renamed variable
import "./LandingPage.css";

const SolutionPage = () => {
  return (
    <div className="section-page">
      <h1 className="section-title">🔍 Our Solution</h1>
      <p className="section-paragraph">
        Our tool helps detect and mitigate bias in resume screening models using modern ML techniques.
        We apply fairness-aware methods like adversarial debiasing to ensure fairer outcomes across gender, ethnicity, and other sensitive attributes.
      </p>
      <img src={equityImg} alt="Debiasing illustration" className="section-image" />
      <p className="section-paragraph">
        With a few clicks, you can evaluate fairness scores and request personalized improvements. Whether you're auditing legacy models or designing responsible AI from scratch — we're here to help.
      </p>
    </div>
  );
};

export default SolutionPage;
