import React, { useState } from "react";
import "./UploadInstructions.css";

const collapsibles = [
  {
    title: "Not comfortable sharing your data? Generate synthetic data instead!",
    content: (
      <div>
        <p>
          If you prefer not to upload real or sensitive data, you can generate a synthetic dataset that mimics your structure and patterns—without exposing any private information. <b>We do not store your data.</b>
        </p>
        <ol>
          <li>
            <b>Copy and paste this prompt into ChatGPT or your favorite AI assistant:</b>
            <div className="copy-prompt-block" tabIndex={0} aria-label="Copyable prompt for synthetic data">
              <code>
                Generate a synthetic CSV file with 100 rows and the following columns: age (integer 20-65), gender (male/female/other, distributed equally), experience_years (integer 0-40), and score (decimal 0.5-1.0). Make the data realistic but do not use any real individuals' information. Output only the CSV table, no explanation.
              </code>
            </div>
          </li>
          <li>
            <b>Download the generated CSV</b> and upload it here for fairness analysis.
          </li>
        </ol>
        <p>
          <b>Why synthetic data?</b> Synthetic data lets you benefit from fairness and bias analysis without sharing any confidential or regulated information. You stay in control of your privacy, and we can still provide you with actionable insights.
        </p>
      </div>
    ),
  },
  {
    title: "Model Best Practices",
    content: (
      <ul>
        <li>Ensure your training data is diverse and representative.</li>
        <li>Use fairness-aware algorithms and constraints when possible.</li>
        <li>Continuously monitor model performance and fairness after deployment.</li>
        <li>Document and disclose model limitations and potential biases.</li>
      </ul>
    ),
  },
  {
    title: "Data Formatting Tips",
    content: (
      <ul>
        <li>Include a single header row (e.g., <code>age, gender, score</code>).</li>
        <li>Each column should have a consistent data type (all numbers, all text, etc.).</li>
        <li>Remove empty columns and rows before uploading.</li>
        <li>Do not include personal identifiers unless required for fairness analysis.</li>
      </ul>
    ),
  },
];

const UploadInstructions: React.FC = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="page-wrapper">
      <div className="content-container">
        {/* UPPER PART: MATCHES YOUR SCREENSHOT */}
        <h1 className="upload-title">Upload Instructions</h1>
        <p className="upload-subtitle">
          Follow these steps to ensure your file uploads smoothly and your analysis is accurate.
        </p>

        <section className="upload-section">
          <h2 className="section-heading">Supported File Types</h2>
          <ul className="custom-list">
            <li>
              <b>Model files:</b>
              <span className="file-ext"> .pkl, .joblib, .onnx, .h5, .pt, .sav</span>
            </li>
            <li>
              <b>Data files:</b>
              <span className="file-ext"> .csv, .xlsx, .xls</span>
            </li>
          </ul>
        </section>

        <section className="upload-section">
          <h2 className="section-heading">File Size Limit</h2>
          <ul className="custom-list">
            <li>
              Maximum file size: <b>100MB</b>
            </li>
          </ul>
        </section>

        <section className="upload-section">
          <h2 className="section-heading">Example Table Structure</h2>
          <div className="upload-table-wrapper">
            <table className="upload-table">
              <thead>
                <tr>
                  <th>age</th>
                  <th>gender</th>
                  <th>experience_years</th>
                  <th>score</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>34</td>
                  <td>male</td>
                  <td>7</td>
                  <td>0.82</td>
                </tr>
                <tr>
                  <td>29</td>
                  <td>female</td>
                  <td>5</td>
                  <td>0.75</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* COLLAPSIBLES BELOW */}
        <section className="collapsible-section">
          {collapsibles.map((item, idx) => (
            <div key={idx} className="collapsible-item">
              <button
                className="collapsible-header"
                onClick={() => setOpen(open === idx ? null : idx)}
                aria-expanded={open === idx}
                aria-controls={`collapsible-content-${idx}`}
                id={`collapsible-header-${idx}`}
                type="button"
              >
                <span>{item.title}</span>
                <span className="collapsible-toggle">{open === idx ? "−" : "+"}</span>
              </button>
              {open === idx && (
                <div
                  className="collapsible-content"
                  id={`collapsible-content-${idx}`}
                  role="region"
                  aria-labelledby={`collapsible-header-${idx}`}
                >
                  <div style={{ padding: "1rem 1.5rem" }}>{item.content}</div>
                </div>
              )}
            </div>
          ))}
        </section>

        <div className="upload-section" style={{ textAlign: "center", marginTop: 32 }}>
          <a href="/upload" className="upload-cta-btn">Ready to upload? Start here</a>
        </div>
      </div>
    </div>
  );
};

export default UploadInstructions;
