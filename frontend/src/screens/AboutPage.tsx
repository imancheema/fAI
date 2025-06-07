// src/screens/AboutPage.tsx
// @ts-nocheck

import React from "react";
import equityImg from "../assets/equity.png";
import "./LandingPage.css";

const AboutPage = () => {
  return (
    <div className="section-page">
      <h1 className="section-title">🤖 About Us</h1>
      <p className="section-paragraph">
        We are a student-built AI for good project — built during the AI4Good Fellowship.
        Our mission is to equip organizations with tools to understand and fix hidden bias in their resume screening models.
      </p>
      <img src={equityImg} alt="Equity illustration" className="section-image" />
      <p className="section-paragraph">
        Whether you're a company, policymaker, or ML practitioner — we want to make AI accountability accessible, fair, and usable.
        We're passionate about fairness, transparency, and real-world impact.
      </p>
    </div>
  );
};

export default AboutPage;
