// src/screens/LandingPage.tsx
import React from "react";
import heroImg from "../assets/hero.png";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const handleGetStarted = () => navigate("/upload");

  return (
    <div className="landing-wrapper">
      <header className="landing-header">
        <div className="landing-content">
          <div className="text-section">
            <h1>
              Does your AI <span className="highlight">judge a book</span> by its cover?
            </h1>
            <h2 className="subtitle">
              Because great resumes don't all look the same.
            </h2>
            <p>
              Upload your resume screening model and instantly see how it performs
              across gender, ethnicity, and more. No guesswork — just clean fairness
              scores and actionable insights to help you build better AI.
            </p>
            <button className="get-started-btn" onClick={handleGetStarted}>
              🚀 Get Started
            </button>
          </div>
          <div className="image-section">
            <img
              src={heroImg}
              alt="Friendly robot analyzing resumes"
              className="hero-robot bounce-animation"
            />
          </div>
        </div>
      </header>
    </div>
  );
};

export default LandingPage;
