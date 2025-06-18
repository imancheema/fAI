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
            {/* Headline with gradient-highlighted phrase */}
            <h1>
              Your AI Screens Resumes.{" "}
              <span className="highlight">But Is It Fair?</span>
            </h1>
            {/* Subtitle with improved spacing and optional style */}
            <h2 className="subtitle">
              Because every candidate deserves an equal chance.
            </h2>
            {/* Call-to-action button */}
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
