// src/screens/AboutPage.tsx
import React from "react";
import equityImg from "../assets/equity.png";
import "./ProblemPage.css"; // Reusing the same styles

const AboutPage = () => (
  <div className="page-wrapper">
    <div className="content-container">
      <h1 className="problem-title">✨ Who Are We?</h1>
      <p className="body-text">
        We’re a squad of AI dreamers, code wizards, and fairness fanatics. Born
        at the AI4Good Fellowship, we’re here to make sure AI opens doors for
        everyone—not just the usual suspects.
      </p>
      <img
        src={equityImg}
        alt="Equity illustration"
        className="content-image"
      />
      <p className="body-text">
        Our vibe? <b>Radical transparency.</b> Our mission?{" "}
        <b>Level the playing field.</b> Our promise?{" "}
        <b>AI that’s actually for good.</b>
        <br />
        <span role="img" aria-label="emoji-burst"></span>
      </p>
    </div>
  </div>
);

export default AboutPage;
