import React from "react";
import { useNavigate } from "react-router-dom";
import { PieChart } from "react-minimal-pie-chart";
import { useModelContext } from "../contexts/ModelContext";
import Steps from "../components/Steps";

import "./EvaluatePage.css";

const EvaluatePage = () => {
  const { modelFile } = useModelContext();
  const navigate = useNavigate();

  return (
    <div>
      <main>
        <Steps />
        <section>
          <h2>Fairness Evaluation</h2>
          <p>
            Evaluate how fair your resume screening model is across different
            groups.
          </p>
        </section>

        <div className="model-card">
          <p>
            <strong>Model:</strong> {modelFile?.name || "No model uploaded"}
          </p>
          <p>
            <strong>Task:</strong> Resume Screening
          </p>
        </div>

        <section className="chart-section">
          <div className="chart-box">
            <h3>Disparity Fairness</h3>
            <PieChart
              data={[
                { title: "Male", value: 50, color: "#A78BFA" },
                { title: "Female", value: 30, color: "#D8B4FE" },
                { title: "Other", value: 20, color: "#E9D5FF" },
              ]}
              animate
              label={({ dataEntry }) =>
                `${dataEntry.title} ${dataEntry.value}%`
              }
              labelStyle={{ fontSize: "5px", fill: "#fff" }}
              radius={40}
              lineWidth={40}
            />
          </div>

          <div className="chart-box">
            <h3>Equality Across Groups</h3>
            <PieChart
              data={[
                { title: "Passed", value: 60, color: "#A0E7E5" },
                { title: "Rejected", value: 40, color: "#B4F8C8" },
              ]}
              animate
              label={({ dataEntry }) =>
                `${dataEntry.title} ${dataEntry.value}%`
              }
              labelStyle={{ fontSize: "5px", fill: "#fff" }}
              radius={40}
              lineWidth={40}
            />
          </div>
        </section>

        <button onClick={() => navigate("/debias")}>Next: Make Fair →</button>
      </main>
    </div>
  );
};

export default EvaluatePage;
