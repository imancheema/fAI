import React from "react";
import equityImg from "../assets/equity.png";
import "./ProblemPage.css";

const AboutPage = () => (
  <div className="page-wrapper">
    <div className="content-container">
      <h1 className="problem-title">Who Are We?</h1>
      <p className="body-text">
        We are part of the AI4Good Fellowship, a community dedicated to using
        artificial intelligence for positive social impact. Our team focuses on
        making hiring fairer and more transparent by helping companies identify
        and reduce bias in their resume screening models.
      </p>
      <p className="body-text">
        We believe that everyone deserves a fair chance to showcase their
        talents, and our tools aim to support more equitable hiring practices.
      </p>
      {/* <img
        src={equityImg}
        alt="Equity illustration"
        className="content-image"
      /> */}
    </div>
  </div>
);

export default AboutPage;
