// src/screens/ProblemPage.tsx
import React from "react";
import biasImg from "../assets/bias-example.png";
import "./LandingPage.css";

const ProblemPage = () => (
  <div className="section-page genz-bg">
    <h1 className="section-title rainbow-text">🚨 The Real Tea</h1>
    <p className="section-paragraph">
      AI is everywhere—even picking who gets a job. But here’s the plot twist: these models can <b>amplify bias</b> from the past. Same skills, different vibes? You might get ghosted just for your name or the words you use.
    </p>
    <img src={biasImg} alt="Bias illustration" className="section-image floating-img" />
    <p className="section-paragraph">
      Remember that time a big tech company’s AI only liked “bro” resumes? Yeah, we’re not about that life. Let’s fix it.
      <span className="emoji-burst">💥🙅‍♀️🕵️‍♂️</span>
    </p>
  </div>
);

export default ProblemPage;
