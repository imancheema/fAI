import React from "react";
import { PieChart } from "react-minimal-pie-chart";
import "./DashboardMetrics.css";

const DashboardMetrics = () => {
  // Example group data for Pie Chart
  const groupData = [
    { title: "Male", value: 50, color: "#A78BFA" },
    { title: "Female", value: 34, color: "#EA2A5D" },
    { title: "Other", value: 16, color: "#F9A8D4" },
  ];

  const metrics = {
    equalizedOdds: "0.78",
    equalOpportunity: "0.85",
    confusionMatrix: {
      truePositive: 120,
      falsePositive: 15,
      trueNegative: 200,
      falseNegative: 25,
    },
    // Example bias finding
    biasFinding: {
      label: "Disparity Detected",
      description: "32% lower selection rate for female applicants.",
      severity: "high",
    },
  };

  return (
    <div className="dashboard-metrics">
      {/* Bias Alert */}
      <div className={`bias-alert ${metrics.biasFinding.severity}`}>
        <strong>⚠️ {metrics.biasFinding.label}:</strong>
        <span> {metrics.biasFinding.description}</span>
      </div>

      {/* Metrics Row */}
      <div className="metrics-row">
        <div className="metric">
          <h3>Equalized Odds</h3>
          <p>{metrics.equalizedOdds}</p>
        </div>
        <div className="metric">
          <h3>Equal Opportunity</h3>
          <p>{metrics.equalOpportunity}</p>
        </div>
        <div className="metric">
          <h3>Selection by Group</h3>
          <PieChart
            data={groupData}
            animate
            label={({ dataEntry }) =>
              `${dataEntry.title} ${dataEntry.value}%`
            }
            labelStyle={{ fontSize: "5px", fill: "#4b2c7f" }}
            radius={40}
            lineWidth={40}
            style={{ height: "120px" }}
          />
          <div className="pie-legend">
            {groupData.map((g) => (
              <span key={g.title} style={{ color: g.color, marginRight: 12 }}>
                ● {g.title}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Confusion Matrix */}
      <div className="metric confusion-matrix">
        <h3>Confusion Matrix</h3>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Predicted Positive</th>
              <th>Predicted Negative</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Actual Positive</th>
              <td>{metrics.confusionMatrix.truePositive}</td>
              <td>{metrics.confusionMatrix.falseNegative}</td>
            </tr>
            <tr>
              <th>Actual Negative</th>
              <td>{metrics.confusionMatrix.falsePositive}</td>
              <td>{metrics.confusionMatrix.trueNegative}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardMetrics;
