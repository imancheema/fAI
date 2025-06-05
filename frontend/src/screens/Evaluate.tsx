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
      {/* Stepper */}
      <div className="stepper">
        <div className="step active">1. Upload</div>
        <div className="step current">2. Evaluate</div>
        <div className="step">3. Make Fair</div>
      </div>

      <h2 className="title">Fairness Evaluation</h2>

      <div className="model-card">
        <p><strong>MODEL:</strong> {modelFile?.name || "No model uploaded"}</p>
        <p><strong>TASK:</strong> Resume Screening</p>
      </div>

      <div className="charts-section">
        <div className="chart-card">
          <h3>Disparity Fairness</h3>
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
          <button className="view-dashboard-btn">View Dashboard</button>
        </div>

        <div className="chart-card">
          <h3>Equality Across Groups</h3>
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
          <button className="view-dashboard-btn">View Dashboard</button>
        </div>
      </div>

      <button
  className="next-btn"
  onClick={() => navigate("/make-fair")}
>
  Next: Make Fair →
</button>
    </div>
  );
};

export default EvaluatePage;
