import React from "react";
import biasImg from "../assets/bias-example.png";
import "./ProblemPage.css";

const ProblemPage = () => (
  <div className="page-wrapper">
    <div className="content-container">
      <h1 className="problem-title">🚨 The Problem with AI Hiring Tools</h1>
      <p className="body-text">
        Many companies use AI to screen resumes and determine which candidates
        advance in the hiring process. However, these AI tools can have gender
        bias, unintentionally favoring or disadvantaging candidates based on
        gender rather than their skills and qualifications.
      </p>
      <p className="body-text">
        This bias comes from the data the AI was trained on, which often
        reflects past unfair hiring practices. Without checks, these models can
        keep repeating the same mistakes.
      </p>
      <img src={biasImg} alt="Bias illustration" className="content-image" />
      <p className="body-text">
        That is why we are building fAI. It is a web app that lets companies
        upload their AI hiring models so we can test them for bias and fairness
        before they use them in real life.
      </p>
    </div>
  </div>
);

export default ProblemPage;
