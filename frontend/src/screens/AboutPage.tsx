// src/screens/AboutPage.tsx
import React from "react";
import equityImg from "../assets/equity.png";
import "./LandingPage.css";

const AboutPage = () => (
  <div className="section-page genz-bg">
    <h1 className="section-title rainbow-text">✨ Who Are We?</h1>
    <p className="section-paragraph">
      We’re a squad of AI dreamers, code wizards, and fairness fanatics. Born at the AI4Good Fellowship, we’re here to make sure AI opens doors for everyone—not just the usual suspects.
    </p>
    <img src={equityImg} alt="Equity illustration" className="section-image floating-img" />
    <p className="section-paragraph">
      Our vibe? <b>Radical transparency.</b> Our mission? <b>Level the playing field.</b> Our promise? <b>AI that’s actually for good.</b>
      <br /><span className="emoji-burst">🚀🤖🌈</span>
    </p>
  </div>
);

export default AboutPage;
