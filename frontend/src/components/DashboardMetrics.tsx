import React from "react";
import "./DashboardMetrics.css";
import { FaInfoCircle } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";

type MetricCardProps = {
  title: string;
  value: number;
  description: string;
  biasExplanation: React.ReactNode;
};

type InfoCardProps = {
  title: string;
  description: string;
  confusionMatrix: {
    truePositive: number;
    falsePositive: number;
    trueNegative: number;
    falseNegative: number;
  };
};

const getBiasLabel = (value: number) => {
  const fraction = value / 100;
  if (fraction >= 0.8) return { label: "Low Bias", color: "#16a34a" };
  if (fraction >= 0.6) return { label: "Medium Bias", color: "#eab308" };
  return { label: "High Bias", color: "#dc2626" };
};

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  description,
  biasExplanation,
}) => {
  const { label, color } = getBiasLabel(value);

  return (
    <div className="card">
      <h3>
        {title}
        <span className="info-icon" tabIndex={0}>
          {/* @ts-ignore */}
          <FaInfoCircle />
          <span className="tooltip">{description}</span>
        </span>
      </h3>
      <p className="metric-value">{value.toFixed(1)}%</p>

      <div className="bias-scale-labels">
        <span>High</span>
        <span>Low</span>
      </div>

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

      <div className="bias-level-explanation">{biasExplanation}</div>
    </div>
  );
};

const ConfusionMatrixCard: React.FC<InfoCardProps> = ({
  title,
  description,
  confusionMatrix,
}) => (
  <div className="card">
    <h3>
      {title}
      <span className="info-icon" tabIndex={0}>
        {/* @ts-ignore */}
        <FaInfoCircle />
        <span className="tooltip">{description}</span>
      </span>
    </h3>
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
);

const DashboardMetrics: React.FC = () => {
  const equalizedOdds = 35.8;
  const equalOpportunity = 65.6;

  const confusionMatrix = {
    truePositive: 72,
    falsePositive: 15,
    trueNegative: 185,
    falseNegative: 28,
  };

  const equalizedOddsBiasExplanation = (
    <div className="bias-explanation-box">
      <p className="bias-explanation-heading">
        {/* @ts-ignore */}
        <FaLightbulb className="bias-info-icon" />
        Model insight:
      </p>
      <p className="bias-explanation-text">
        <span className="highlight-high">High bias</span> means the AI makes
        more errors for some groups, which might lead to unfair outcomes.
      </p>
    </div>
  );

  const equalOpportunityBiasExplanation = (
    <div className="bias-explanation-box">
      <p className="bias-explanation-heading">
        {/* @ts-ignore */}
        <FaLightbulb className="bias-info-icon" />
        Model insight:
      </p>
      <p className="bias-explanation-text">
        <span className="highlight-medium">Medium bias</span> means qualified
        candidates from certain groups have fewer opportunities.
      </p>
    </div>
  );

  return (
    <div>
      <div className="bias-legend">
        <p>
          <h3 className="legend-title">
            {/* @ts-ignore */}
            <FaQuestionCircle
              className="legend-icon"
              style={{ color: "#7c3aed", marginRight: 8 }}
            />
            Score Legend
          </h3>
          Lower % = <span className="highlight-high">higher bias</span> ⚠
          <br />
          Higher % ={" "}
          <span style={{ color: "#16a34a", fontWeight: 600 }}>
            lower bias
          </span>{" "}
          ✔
        </p>
      </div>

      {/* This is the flex container for the cards ONLY */}
      <div className="dashboard-container">
        <MetricCard
          title="Equalized Odds"
          value={equalizedOdds}
          description="Checks if the AI makes mistakes fairly across all groups. One group should not face more errors than another."
          biasExplanation={equalizedOddsBiasExplanation}
        />
        <MetricCard
          title="Equal Opportunity"
          value={equalOpportunity}
          description="Checks if qualified individuals from different groups have an equal chance of being selected."
          biasExplanation={equalOpportunityBiasExplanation}
        />
        <ConfusionMatrixCard
          title="Confusion Matrix"
          description="Shows how well the AI predicted outcomes by comparing its predictions to actual results."
          confusionMatrix={confusionMatrix}
        />
      </div>
    </div>
  );
};

export default DashboardMetrics;
