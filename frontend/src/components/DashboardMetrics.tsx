import React from "react";
import "./DashboardMetrics.css";

const DashboardMetrics = () => {
  const metrics = {
    equalizedOdds: "0.78",
    equalOpportunity: "0.85",
    confusionMatrix: {
      truePositive: 120,
      falsePositive: 15,
      trueNegative: 200,
      falseNegative: 25,
    },
  };

  return (
    <>
      <div className="metrics-row">
        <div className="metric">
          <h3>Equalized Odds</h3>
          <p>{metrics.equalizedOdds}</p>
        </div>

        <div className="metric">
          <h3>Equal Opportunity</h3>
          <p>{metrics.equalOpportunity}</p>
        </div>
      </div>

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
    </>
  );
};

export default DashboardMetrics;
