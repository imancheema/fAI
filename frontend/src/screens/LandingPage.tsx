// src/screens/LandingPage.tsx
import React from "react";
import heroImg from "../assets/hero.png";
import "./LandingPage.css";
import "../App.css";

import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const handleGetStarted = () => navigate("/upload");

  return (
    <div className="landing-wrapper">
      <header className="landing-header">
        <div className="landing-content">
          <div className="text-section">
            <h1>Your AI Screens Resumes. But Is It Fair?</h1>
            <h2 className="subtitle">
              Because every candidate deserves an equal chance.
            </h2>
            {/* <p>
              Upload your resume screening model, and we’ll help you uncover how
              fair they truly are. No fluff, just quick fairness metrics and
              clear results so you can see if your AI is playing fair.
            </p> */}
            <button className="get-started-btn" onClick={handleGetStarted}>
              Get Started
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
