import React from "react";
import "./DashboardMetrics.css";

type MetricCardProps = {
  title: string;
  value: number;
};

const getBiasLabel = (value: number) => {
  const fraction = value / 100;

  if (fraction >= 0.8) return { label: "Low Bias", color: "#16a34a" }; // green
  if (fraction >= 0.6) return { label: "Medium Bias", color: "#eab308" }; // yellow
  return { label: "High Bias", color: "#dc2626" }; // red
};

const MetricCard: React.FC<MetricCardProps> = ({ title, value }) => {
  const { label, color } = getBiasLabel(value);

  return (
    <div className="card">
      <h3>{title}</h3>
      <p className="metric-value">{value.toFixed(1)}%</p>
      <div
        className="progress-bar-container"
        aria-label={`${title} progress`}
        title={`${title}: ${value.toFixed(1)}% (${label})`}
      >
        <div
          className="progress-bar-fill"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
      <div className="bias-label" style={{ color }}>
        ● {label}
      </div>
    </div>
  );
};

const DashboardMetrics: React.FC = () => {
  // Use percentage values directly now
  const equalizedOdds = 35.8;
  const equalOpportunity = 60.6;

  const confusionMatrix = {
    truePositive: 72,
    falsePositive: 15,
    trueNegative: 185,
    falseNegative: 28,
  };

  return (
    <div className="dashboard-container">
      <MetricCard title="Equalized Odds" value={equalizedOdds} />
      <MetricCard title="Equal Opportunity" value={equalOpportunity} />

      <div className="card">
        <h3>Confusion Matrix</h3>
        <table className="confusion-matrix">
          <tbody>
            <tr>
              <th></th>
              <th>Predicted Positive</th>
              <th>Predicted Negative</th>
            </tr>
            <tr>
              <th>Actual Positive</th>
              <td>{confusionMatrix.truePositive}</td>
              <td>{confusionMatrix.falseNegative}</td>
            </tr>
            <tr>
              <th>Actual Negative</th>
              <td>{confusionMatrix.falsePositive}</td>
              <td>{confusionMatrix.trueNegative}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardMetrics;
