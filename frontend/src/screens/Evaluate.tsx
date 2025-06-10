import React from "react";
import { useNavigate } from "react-router-dom";
import { PieChart } from "react-minimal-pie-chart";
import { useModelContext } from "../contexts/ModelContext";
import "./EvaluatePage.css";

const EvaluatePage = () => {
  const { modelFile } = useModelContext();
  const navigate = useNavigate();

  return (
    <div className="evaluate-page-container">
      {/* Timeline */}
      <div className="upload-timeline" style={{ maxWidth: 800, margin: "0 auto", marginTop: 32 }}>
        <div className="timeline-step active">
          <span role="img" aria-label="Upload">📤</span> Upload
        </div>
        <span className="timeline-arrow">→</span>
        <div className="timeline-step active">
          <span role="img" aria-label="Dashboard">📊</span> Dashboard
        </div>
        <span className="timeline-arrow">→</span>
        <div className="timeline-step">
          <span role="img" aria-label="Debias">🛠️</span> Debias
        </div>
      </div>

      {/* Main content */}
      <div className="main-content" style={{ maxWidth: 800, margin: "0 auto", padding: "0 1rem" }}>
        <h2
          className="title"
          style={{
            textAlign: "center",
            fontSize: "2.5rem",
            marginBottom: "1.2rem",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            color: "#32000c",
            letterSpacing: "-1px"
          }}
        >
          Fairness Evaluation
        </h2>

        <div
          className="model-card"
          style={{
            margin: "0 auto 32px",
            maxWidth: 420,
            background: "#ffe6ef",
            borderRadius: 14,
            padding: "1.2rem 1.5rem",
            color: "#32000c",
            fontSize: "1rem",
            boxShadow: "0 2px 8px rgba(234,42,93,0.04)"
          }}
        >
          <p><strong>MODEL:</strong> {modelFile?.name || "No model uploaded"}</p>
          <p><strong>TASK:</strong> Resume Screening</p>
        </div>

        <div className="charts-section" style={{ display: "flex", justifyContent: "center", gap: 24 }}>
          <div
            className="chart-card"
            style={{
              flex: 1,
              minWidth: 260,
              maxWidth: 340,
              background: "#fff6f8",
              borderRadius: 20,
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
              padding: "2rem",
              marginBottom: 24,
              border: "1.5px dashed #ea2a5d",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <h3 style={{ color: "#5a2731", marginBottom: 16, fontWeight: 600 }}>Disparity Fairness</h3>
            <PieChart
              data={[
                { title: "Male", value: 50, color: "#EA2A5D" },
                { title: "Female", value: 30, color: "#FFB6B9" },
                { title: "Other", value: 20, color: "#FFD6E0" },
              ]}
              animate
              label={({ dataEntry }) => `${dataEntry.title} ${dataEntry.value}%`}
              labelStyle={{ fontSize: "5px", fill: "#fff" }}
              radius={40}
              lineWidth={40}
            />
            <button className="view-dashboard-btn" style={{ marginTop: 18 }}>View Dashboard</button>
          </div>

          <div
            className="chart-card"
            style={{
              flex: 1,
              minWidth: 260,
              maxWidth: 340,
              background: "#fff6f8",
              borderRadius: 20,
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
              padding: "2rem",
              marginBottom: 24,
              border: "1.5px dashed #ea2a5d",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <h3 style={{ color: "#5a2731", marginBottom: 16, fontWeight: 600 }}>Equality Across Groups</h3>
            <PieChart
              data={[
                { title: "Passed", value: 60, color: "#A0E7E5" },
                { title: "Rejected", value: 40, color: "#B4F8C8" },
              ]}
              animate
              label={({ dataEntry }) => `${dataEntry.title} ${dataEntry.value}%`}
              labelStyle={{ fontSize: "5px", fill: "#fff" }}
              radius={40}
              lineWidth={40}
            />
            <button className="view-dashboard-btn" style={{ marginTop: 18 }}>View Dashboard</button>
          </div>
        </div>

        <button
          className="next-btn"
          style={{ display: "block", margin: "32px auto 0 auto" }}
          onClick={() => navigate("/make-fair")}
        >
          Next: Make Fair →
        </button>
      </div>
    </div>
  );
};

export default EvaluatePage;
