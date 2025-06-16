import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PieChart } from "react-minimal-pie-chart";
import { useModelContext } from "../contexts/ModelContext";
import Steps from "../components/Steps";
import DashboardMetrics from "../components/DashboardMetrics";

import "./EvaluatePage.css";

const EvaluatePage = () => {
  const { modelFile } = useModelContext();
  const navigate = useNavigate();

  const [task, setTask] = useState("resume-screening");

  const tasks = [
    { value: "resume-screening", label: "Resume Screening" },
    { value: "candidate-ranking", label: "Candidate Ranking" },
    { value: "skill-assessment", label: "Skill Assessment" },
    { value: "interview-scheduling", label: "Interview Scheduling" },
    {
      value: "employee-engagement",
      label: "Employee Engagement",
    },
  ];

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

        <div>
          <p>
            <span className="model-title">Model:</span>{" "}
            {modelFile?.name || "No model uploaded"}
          </p>

          <p>
            <span className="model-title">Task:</span>{" "}
            <select value={task} onChange={(e) => setTask(e.target.value)}>
              {tasks.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </p>
        </div>

        <DashboardMetrics />

        {/* <section className="chart-section">
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
        </section> */}

        <button onClick={() => navigate("/debias")}>Next: Make Fair →</button>
      </main>
    </div>
  );
};

export default EvaluatePage;
