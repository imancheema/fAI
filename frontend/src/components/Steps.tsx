import React from "react";
// import { FaUpload, FaChartBar, FaTools } from "react-icons/fa";
import "./Steps.css";

const Steps: React.FC = () => {
  return (
    <div className="steps-timeline">
      <div className="steps-timeline-step">
        <span className="steps-icon" aria-label="Upload icon">
           {/* <FaUpload /> */}
           ⬆️
        </span>
        Upload
      </div>
      <span className="steps-timeline-arrow">→</span>
      <div className="steps-timeline-step">
        <span className="steps-icon" aria-label="Dashboard icon">
          {/* <FaChartBar /> */}
          📊
        </span>
        Dashboard
      </div>
      <span className="steps-timeline-arrow">→</span>
      <div className="steps-timeline-step">
        <span className="steps-icon" aria-label="Debias icon">
          {/* <FaTools /> */}
          🛠️
        </span>
        Debias
      </div>
    </div>
  );
};

export default Steps;
