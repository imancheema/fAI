import React from "react";
import heroImg from "../assets/hero.png";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate("/upload");
  };
  return (
    <div className="landing-wrapper">
      <header className="landing-header">
        <div className="landing-content">
          <div className="text-section">
            <h1>Does your AI judge a book by its cover?</h1>
            <h2 className="subtitle">
              Because great resumes don't all look the same.
            </h2>
            <p>
              Share your resume screening models, and we’ll help you uncover how
              fair they truly are. No fluff, just quick fairness metrics and
              clear results so you can see if your AI is playing fair.
            </p>
            <button className="get-started-btn" onClick={handleGetStarted}>
              Get Started
            </button>
          </div>
          <div className="image-section">
            <img src={heroImg} alt="AI fairness" />
          </div>
        </div>
      </header>
    </div>
  );
};

export default LandingPage;
