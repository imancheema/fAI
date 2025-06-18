import React, { useRef, useState, useEffect } from "react";
import { PieChart } from "react-minimal-pie-chart";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./EvaluatePage.css";

function MiniDial({ value, color, label }: { value: number; color: string; label: string }) {
  const WIDTH = 80;
  const HEIGHT = 48;
  const CX = WIDTH / 2;
  const CY = HEIGHT * 1.15;
  const RADIUS = 32;

  // Clamp value and calculate angle (-120 to +120 degrees)
  const pct = Math.max(0, Math.min(1, value));
  const angle = -120 + pct * 240;
  const rad = (angle * Math.PI) / 180;
  const needleX = CX + RADIUS * Math.cos(rad);
  const needleY = CY + RADIUS * Math.sin(rad);

  // Arc path helpers
  function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number): string {
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);
    const arcSweep = endAngle - startAngle <= 180 ? "0" : "1";
    return [
      "M", start.x, start.y,
      "A", r, r, 0, arcSweep, 0, end.x, end.y
    ].join(" ");
  }
  function polarToCartesian(cx: number, cy: number, r: number, angle: number): { x: number; y: number } {
    const rad = (angle - 90) * Math.PI / 180.0;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad)
    };
  }

  const arcBg = describeArc(CX, CY, RADIUS, -120, 120);

  return (
    <div style={{ width: WIDTH, margin: "0 auto", textAlign: "center" }}>
      <svg width={WIDTH} height={HEIGHT}>
        {/* Arc background */}
        <path
          d={arcBg}
          fill="none"
          stroke="#e9ddff"
          strokeWidth={8}
          strokeLinecap="round"
        />
        {/* Needle */}
        <line
          x1={CX}
          y1={CY}
          x2={needleX}
          y2={needleY}
          stroke={color}
          strokeWidth={4}
          strokeLinecap="round"
        />
        {/* Needle hub */}
        <circle cx={CX} cy={CY} r={5} fill={color} />
        {/* Value label */}
        <text
          x={CX}
          y={HEIGHT - 5}
          textAnchor="middle"
          fontSize="15"
          fontWeight="bold"
          fill="#6d28d9"
        >
          {(pct * 100).toFixed(0)}%
        </text>
      </svg>
      <div style={{ color, fontWeight: 700, fontSize: 13, marginTop: 2 }}>
        {label}
      </div>
    </div>
  );
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const arcSweep = endAngle - startAngle <= 180 ? "0" : "1";
  return [
    "M", start.x, start.y,
    "A", r, r, 0, arcSweep, 0, end.x, end.y
  ].join(" ");
}

function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  const rad = (angle - 90) * Math.PI / 180.0;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad)
  };
}



// --- Helper ---
const getDialAngle = (value: number) => -120 + (value / 100) * 240;

const LIGHT_PURPLE = "#e9ddff";
const PURPLE = "#b699cc";
const DEEP_PURPLE = "#7c3aed";
const ACCENT_PURPLE = "#a78bfa";
const TEXT_PURPLE = "#6d28d9";
const WHITE = "#fff";

const EvaluatePage = () => {
  const [tab, setTab] = useState("dashboard");
  const [task, setTask] = useState("resume-screening");
  const [fairnessValue, setFairnessValue] = useState(80); // 0 = red, 100 = green

  const [tooltip, setTooltip] = useState("");
  type ModalMetric = { name: string; description: string } | null;
  const [modalMetric, setModalMetric] = useState<ModalMetric>(null);
  const [showTransparency, setShowTransparency] = useState(false);

  // Simulate metrics
  const groupA = 51;
  const groupB = 34;
  const equalOppDiff = Math.abs(groupA - groupB) / 100;
  const equalizedOddsDiff = Math.abs((groupA - 30) - (groupB - 20)) / 100;

  // For PDF download
  const pdfRef = useRef(null);
  const handleDownloadPDF = async () => {
    if (!pdfRef.current) return;
    const canvas = await html2canvas(pdfRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pdfWidth = pageWidth - 40;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 20, 20, pdfWidth, pdfHeight, undefined, "FAST");
    pdf.save(tab === "summary" ? "summary.pdf" : "dashboard.pdf");
  };

  // Animate dial needle
  useEffect(() => {
    const needle = document.getElementById("dial-needle");
    if (needle) {
      needle.style.transition = "transform 1.2s cubic-bezier(.68,-0.55,.27,1.55)";
      needle.style.transform = `rotate(${getDialAngle(fairnessValue)}deg)`;
    }
    const label = document.getElementById("dial-label");
    if (label) {
      label.textContent = `${fairnessValue}%`;
    }
  }, [fairnessValue]);

  // Confusion matrix data
  const matrix = [
    [120, 25], // [TP, FN]
    [15, 200], // [FP, TN]
  ];

  // Bias levels for banner
  const getBiasLevel = (value: number) => {
    if (value >= 0.15) return "danger";
    if (value >= 0.05) return "warning";
    return "safe";
  };
  const anyDanger = getBiasLevel(equalOppDiff) === "danger" || getBiasLevel(equalizedOddsDiff) === "danger";

  return (
    <div style={{ background: LIGHT_PURPLE, minHeight: "100vh", padding: 32 }}>
      {/* Tab Switcher */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 24, gap: 16 }}>
        <button
          style={{
            background: tab === "dashboard" ? ACCENT_PURPLE : LIGHT_PURPLE,
            color: tab === "dashboard" ? WHITE : DEEP_PURPLE,
            fontWeight: 700,
            border: "none",
            borderRadius: 8,
            padding: "0.7rem 2rem",
            fontSize: 18,
            cursor: "pointer",
          }}
          onClick={() => setTab("dashboard")}
          aria-pressed={tab === "dashboard"}
        >
          Dashboard View
        </button>
        <button
          style={{
            background: tab === "summary" ? ACCENT_PURPLE : LIGHT_PURPLE,
            color: tab === "summary" ? WHITE : DEEP_PURPLE,
            fontWeight: 700,
            border: "none",
            borderRadius: 8,
            padding: "0.7rem 2rem",
            fontSize: 18,
            cursor: "pointer",
          }}
          onClick={() => setTab("summary")}
          aria-pressed={tab === "summary"}
        >
          Summary View
        </button>
      </div>

      <div ref={pdfRef}>
        {tab === "dashboard" ? (
          <>
            {/* URGENT BANNER */}
            {anyDanger && (
              <div
                className="alert-card alert-danger"
                role="alert"
                style={{
                  background: LIGHT_PURPLE,
                  borderLeft: `6px solid ${DEEP_PURPLE}`,
                  color: DEEP_PURPLE,
                  fontWeight: 700,
                  marginBottom: 24,
                  borderRadius: 12,
                  boxShadow: "0 2px 12px #b699cc33",
                }}
              >
                <span className="alert-icon" aria-label="Danger" style={{ fontSize: 28 }}>
                  🚨
                </span>
                <div>
                  <b>Attention Required:</b> Significant bias detected in one or more metrics.
                  <div className="alert-desc" style={{ color: TEXT_PURPLE, marginTop: 6 }}>
                    Please review the metrics and recommendations below.
                  </div>
                </div>
              </div>
            )}

            {/* HEADER */}
            <div style={{ display: "flex", gap: 40, justifyContent: "center", marginBottom: 32 }}>
              <div style={{ fontWeight: 600, color: DEEP_PURPLE }}>
                Model:{" "}
                <span style={{ color: TEXT_PURPLE, fontWeight: 700 }}>ResumeScreener-v1</span>
              </div>
              <div style={{ fontWeight: 600, color: DEEP_PURPLE }}>
                Task:{" "}
                <select
                  style={{
                    fontWeight: 700,
                    color: TEXT_PURPLE,
                    background: LIGHT_PURPLE,
                    border: `1px solid ${ACCENT_PURPLE}`,
                    borderRadius: 6,
                    padding: "2px 8px",
                  }}
                  value={task}
                  onChange={e => setTask(e.target.value)}
                >
                  <option value="resume-screening">Resume Screening</option>
                  <option value="candidate-ranking">Candidate Ranking</option>
                  <option value="skill-assessment">Skill Assessment</option>
                  <option value="interview-scheduling">Interview Scheduling</option>
                  <option value="employee-engagement">Employee Engagement</option>
                </select>
              </div>
            </div>

            {/* EXECUTIVE SUMMARY */}
            <div
              style={{
                background: ACCENT_PURPLE,
                color: WHITE,
                padding: "1rem 1.5rem",
                borderRadius: 10,
                marginBottom: 32,
                fontWeight: 600,
                maxWidth: 600,
                marginLeft: "auto",
                marginRight: "auto",
                fontSize: 18,
                textAlign: "center",
              }}
            >
              Summary: Key findings and recommended actions are highlighted below.
            </div>

            {/* DIAL CARD */}
            <div style={{ position: "relative", margin :"0 auto", textAlign: "center" ,  width: 340, height: 170 }}>
              <svg width="320" height="170" viewBox="0 0 320 170" aria-label="Fairness Status Dial">
                {/* Green: -120° to -40° (first third) */}
                <path
                  d="M40,160 A120,120 0 0,1 120,56"
                  fill="none"
                  stroke="#00C853"
                  strokeWidth="28"
                  strokeLinecap="butt"
                />
                {/* Yellow: -40° to +40° (middle third) */}
                <path
                  d="M120,56 A120,120 0 0,1 200,56"
                  fill="none"
                  stroke="#FFD600"
                  strokeWidth="28"
                  strokeLinecap="butt"
                />
                {/* Red: +40° to +120° (last third) */}
                <path
                  d="M200,56 A120,120 0 0,1 280,160"
                  fill="none"
                  stroke="#D50000"
                  strokeWidth="28"
                  strokeLinecap="butt"
                />
                {/* Needle */}
                <g
                  style={{
                    transform: `rotate(${-120 + (fairnessValue / 100) * 240}deg)`,
                    transformOrigin: "160px 160px",
                    transition: "transform 1.2s cubic-bezier(.68,-0.55,.27,1.55)",
                  }}
                >
                  <rect x="157" y="60" width="6" height="100" fill="#6d28d9" rx="3" />
                </g>
                <circle cx="160" cy="160" r="13" fill="#6d28d9" />
              </svg>
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 20,
                  textAlign: "center",
                  fontWeight: 700,
                  fontSize: 20,
                  color: "#6d28d9",
                }}
              >
                {`${fairnessValue}%`}
              </div>
            </div>
            <div
  style={{
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 2px 12px #b699cc33",
    padding: "10px 22px",
    maxWidth: 540,
    margin: "18px auto 0 auto",
    display: "flex",
    alignItems: "center",
    gap: 12,
    fontSize: 16,
    color: "#4b3676",
    fontWeight: 500,
    lineHeight: 1,
    whiteSpace: "nowrap",
  }}
>
  <span
    style={{
      background: "#a78bfa",
      color: "#fff",
      borderRadius: "50%",
      width: 22,
      height: 22,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 700,
      fontSize: 17,
      flexShrink: 0,
      marginRight: 8,
    }}
    aria-label="Dial Info"
    title="Dial Info"
  >
    i
  </span>
  <span>
    <span style={{ color: "#D50000", fontWeight: 700 }}>Red</span>: High bias
    <span style={{ margin: "0 10px", color: "#bbb" }}>|</span>
    <span style={{ color: "#FFD600", fontWeight: 700 }}>Yellow</span>: Moderate bias
    <span style={{ margin: "0 10px", color: "#bbb" }}>|</span>
    <span style={{ color: "#00C853", fontWeight: 700 }}>Green</span>: Low bias
  </span>
</div>

            {/* METRIC CARDS */}
            <div
              style={{
                background: WHITE,
                borderRadius: 20,
                boxShadow: "0 4px 24px #b699cc22",
                padding: "2rem 1rem",
                marginBottom: "2rem",
                maxWidth: 900,
                marginLeft: "auto",
                marginRight: "auto",
                display: "flex",
                flexWrap: "wrap",
                gap: 32,
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              {/* Equal Opportunity Diff Card */}
              <div style={{ flex: 1, minWidth: 260, maxWidth: 330 }}>
  <div
    style={{
      background: LIGHT_PURPLE,
      borderRadius: 12,
      boxShadow: "0 2px 8px #b699cc33",
      padding: "1.2rem 1.5rem",
      minWidth: 180,
      textAlign: "center",
    }}
  >
    <span style={{ color: DEEP_PURPLE, fontWeight: 700 }}>Equal Opportunity Diff</span>
    <span
      style={{
        display: "inline-block",
        width: 12,
        height: 12,
        borderRadius: "50%",
        background:
          getBiasLevel(equalOppDiff) === "danger"
            ? "#EA2A5D"
            : getBiasLevel(equalOppDiff) === "warning"
            ? "#FFD600"
            : "#4CAF50",
        marginLeft: 8,
        verticalAlign: "middle",
      }}
    ></span>
    <div style={{ fontSize: 22, fontWeight: 700, color: TEXT_PURPLE, margin: "8px 0" }}>
      {equalOppDiff.toFixed(2)}
    </div>
    <button
      aria-label="What is Equal Opportunity Difference?"
      style={{
        background: "none",
        border: "none",
        color: ACCENT_PURPLE,
        cursor: "pointer",
        fontSize: 18,
      }}
      title="Difference in true positive rates between groups."
      tabIndex={0}
      onClick={() =>
        setModalMetric({
          name: "Equal Opportunity Diff",
          description:
            "Equal Opportunity measures how similar the true positive rates are across groups.",
        })
      }
    >
      ⓘ
    </button>
  </div>
  <div style={{ margin: "18px auto 0 auto", maxWidth: 220 }}>
    {/* --- MINI SPEEDOMETER DIAL --- */}
    <div style={{ width: 135, margin: "0 auto", textAlign: "center" }}>
  <svg width={135} height={81}>
    {/* Arc background */}
    <path
      d={describeArc(67.5, 81, 57, -120, 120)}
      fill="none"
      stroke="#e9ddff"
      strokeWidth={15}
      strokeLinecap="round"
    />
    {/* Needle */}
    <line
      x1={67.5}
      y1={81}
      x2={67.5 + 57 * Math.cos((-120 + equalOppDiff * 240) * Math.PI / 180)}
      y2={81 + 57 * Math.sin((-120 + equalOppDiff * 240) * Math.PI / 180)}
      stroke={
        getBiasLevel(equalOppDiff) === "danger"
          ? "#EA2A5D"
          : getBiasLevel(equalOppDiff) === "warning"
          ? "#FFD600"
          : "#00C853"
      }
      strokeWidth={7}
      strokeLinecap="round"
    />
    {/* Needle hub */}
    <circle cx={67.5} cy={81} r={10} fill="#6d28d9" />
    {/* Value label */}
    <text
      x={67.5}
      y={50}
      textAnchor="middle"
      fontSize="28"
      fontWeight="bold"
      fill="#6d28d9"
      dominantBaseline="middle"
    >
      {Math.round(equalOppDiff * 100)}%
    </text>
  </svg>
</div>

    {/* --- END MINI SPEEDOMETER DIAL --- */}
    <div style={{ marginTop: 8, textAlign: "center" }}>
      <span
        style={{
          color:
            getBiasLevel(equalOppDiff) === "danger"
              ? "#EA2A5D"
              : getBiasLevel(equalOppDiff) === "warning"
              ? "#FFD600"
              : "#00C853",
        }}
      >
        ● {getBiasLevel(equalOppDiff) === "danger"
          ? "High Bias"
          : getBiasLevel(equalOppDiff) === "warning"
          ? "Moderate Bias"
          : "Low Bias"}
      </span>
    </div>
  </div>
</div>


              {/* Equalized Odds Diff Card */}
              <div style={{ flex: 1, minWidth: 260, maxWidth: 330 }}>
                <div
                  style={{
                    background: LIGHT_PURPLE,
                    borderRadius: 12,
                    boxShadow: "0 2px 8px #b699cc33",
                    padding: "1.2rem 1.5rem",
                    minWidth: 180,
                    textAlign: "center",
                  }}
                >
                  <span style={{ color: DEEP_PURPLE, fontWeight: 700 }}>Equalized Odds Diff</span>
                  <span
                    style={{
                      display: "inline-block",
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      background:
                        getBiasLevel(equalizedOddsDiff) === "danger"
                          ? "#EA2A5D"
                          : getBiasLevel(equalizedOddsDiff) === "warning"
                          ? "#FFD600"
                          : "#4CAF50",
                      marginLeft: 8,
                      verticalAlign: "middle",
                    }}
                  ></span>
                  <div style={{ fontSize: 22, fontWeight: 700, color: TEXT_PURPLE, margin: "8px 0" }}>
                    {equalizedOddsDiff.toFixed(2)}
                  </div>
                  <button
                    aria-label="What is Equalized Odds Difference?"
                    style={{
                      background: "none",
                      border: "none",
                      color: ACCENT_PURPLE,
                      cursor: "pointer",
                      fontSize: 18,
                    }}
                    title="Difference in error rates between groups."
                    tabIndex={0}
                    onClick={() =>
                      setModalMetric({
                        name: "Equalized Odds Diff",
                        description:
                          "Equalized Odds measures how similar the error rates (false positives and false negatives) are across demographic groups.",
                      })
                    }
                  >
                    ⓘ
                  </button>
                </div>
                <div style={{ margin: "18px auto 0 auto", maxWidth: 220 }}>
                  <PieChart
                    data={[
                      {
                        title: "Bias",
                        value: Math.round(equalizedOddsDiff * 100),
                        color:
                          getBiasLevel(equalizedOddsDiff) === "danger"
                            ? "#EA2A5D"
                            : getBiasLevel(equalizedOddsDiff) === "warning"
                            ? "#FFD600"
                            : "#4CAF50",
                      },
                      { title: "Other", value: 100 - Math.round(equalizedOddsDiff * 100), color: LIGHT_PURPLE },
                    ]}
                    animate
                    label={({ dataEntry }) => `${dataEntry.title} ${dataEntry.value}%`}
                    labelStyle={{ fontSize: "12px", fill: "#5c4a82", fontWeight: 700 }}
                    radius={40}
                    lineWidth={40}
                    style={{ maxWidth: 180, margin: "0 auto" }}
                  />
                  <div style={{ marginTop: 8 }}>
                    <span
                      style={{
                        color:
                          getBiasLevel(equalizedOddsDiff) === "danger"
                            ? "#EA2A5D"
                            : getBiasLevel(equalizedOddsDiff) === "warning"
                            ? "#FFD600"
                            : "#4CAF50",
                      }}
                    >
                      ●{" "}
                      {getBiasLevel(equalizedOddsDiff) === "danger"
                        ? "High Bias"
                        : getBiasLevel(equalizedOddsDiff) === "warning"
                        ? "Moderate Bias"
                        : "Low Bias"}
                    </span>
                    <span style={{ color: LIGHT_PURPLE, marginLeft: 12 }}>● Other</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CONFUSION MATRIX */}
            <div
              style={{
                background: WHITE,
                borderRadius: 20,
                boxShadow: "0 4px 24px #b699cc22",
                padding: "2rem 1rem",
                marginBottom: "2rem",
                maxWidth: 500,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <h3 style={{ color: DEEP_PURPLE, textAlign: "center", fontWeight: 700, marginBottom: 16 }}>
                Confusion Matrix
              </h3>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "separate",
                  borderSpacing: 0,
                  background: WHITE,
                  borderRadius: 12,
                  overflow: "hidden",
                  boxShadow: "0 1px 6px #b699cc22",
                }}
                aria-label="Statistical Confusion Matrix"
              >
                <thead>
                  <tr>
                    <th style={{ background: LIGHT_PURPLE, color: DEEP_PURPLE, fontWeight: 700 }}></th>
                    <th style={{ background: LIGHT_PURPLE, color: DEEP_PURPLE, fontWeight: 700 }}>
                      Predicted Positive
                    </th>
                    <th style={{ background: LIGHT_PURPLE, color: DEEP_PURPLE, fontWeight: 700 }}>
                      Predicted Negative
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th style={{ background: LIGHT_PURPLE, color: DEEP_PURPLE, fontWeight: 700 }}>
                      Actual Positive
                    </th>
                    <td
                      style={{
                        fontWeight: "bold",
                        background: "#e0ffe0",
                        border: `2px solid ${ACCENT_PURPLE}`,
                        boxShadow: "0 0 0 3px #b699cc44",
                        cursor: "pointer",
                      }}
                      tabIndex={0}
                      aria-label="True Positives: Correctly selected resumes"
                      title="True Positives: Correctly selected resumes"
                    >
                      120
                    </td>
                    <td
                      style={{
                        background: WHITE,
                        border: `2px solid ${ACCENT_PURPLE}`,
                        cursor: "pointer",
                      }}
                      tabIndex={0}
                      aria-label="False Negatives: Missed qualified resumes"
                      title="False Negatives: Missed qualified resumes"
                    >
                      25
                    </td>
                  </tr>
                  <tr>
                    <th style={{ background: LIGHT_PURPLE, color: DEEP_PURPLE, fontWeight: 700 }}>
                      Actual Negative
                    </th>
                    <td
                      style={{
                        background: WHITE,
                        border: `2px solid ${ACCENT_PURPLE}`,
                        cursor: "pointer",
                      }}
                      tabIndex={0}
                      aria-label="False Positives: Incorrectly selected resumes"
                      title="False Positives: Incorrectly selected resumes"
                    >
                      15
                    </td>
                    <td
                      style={{
                        fontWeight: "bold",
                        background: "#e0ffe0",
                        border: `2px solid ${ACCENT_PURPLE}`,
                        boxShadow: "0 0 0 3px #b699cc44",
                        cursor: "pointer",
                      }}
                      tabIndex={0}
                      aria-label="True Negatives: Correctly rejected resumes"
                      title="True Negatives: Correctly rejected resumes"
                    >
                      200
                    </td>
                  </tr>
                </tbody>
              </table>
              <div style={{ color: "#888", fontSize: 13, marginTop: 8 }}>
                Diagonal = correct predictions. Hover or focus cells for definitions.
              </div>
            </div>

            {/* Download PDF */}
            <div style={{ textAlign: "center", margin: "2rem 0" }}>
              <button
                style={{
                  background: LIGHT_PURPLE,
                  color: DEEP_PURPLE,
                  border: "none",
                  borderRadius: 6,
                  padding: "0.5rem 1.5rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
                aria-label="Download PDF Report"
                onClick={handleDownloadPDF}
              >
                Download PDF Report
              </button>
            </div>

            {/* Transparency & Limitations */}
            <div style={{ margin: "2rem auto", maxWidth: 600, textAlign: "center" }}>
              <button
                style={{
                  background: LIGHT_PURPLE,
                  color: DEEP_PURPLE,
                  border: "none",
                  borderRadius: 6,
                  padding: "0.5rem 1.5rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
                onClick={() => setShowTransparency((v) => !v)}
                aria-expanded={showTransparency}
                aria-controls="transparency-panel"
              >
                {showTransparency ? "Hide" : "Show"} Dashboard Transparency & Limitations
              </button>
              {showTransparency && (
                <div
                  id="transparency-panel"
                  style={{
                    background: WHITE,
                    borderRadius: 12,
                    marginTop: 16,
                    padding: 24,
                    color: TEXT_PURPLE,
                    textAlign: "left",
                  }}
                  tabIndex={0}
                >
                  <h4>Transparency & Limitations</h4>
                  <ul>
                    <li>
                      <b>Fairness metrics</b> are calculated based on available sensitive attributes (e.g., gender, ethnicity). Metrics may not capture all forms of bias.
                    </li>
                    <li>
                      <b>Data representativeness:</b> If your dataset is highly imbalanced or missing groups, results may be less reliable.
                    </li>
                    <li>
                      <b>Model limitations:</b> This dashboard cannot guarantee full fairness or account for all societal factors. Use as a guide for further review.
                    </li>
                    <li>
                      <b>Accessibility:</b> All features are keyboard and screen reader accessible. Please contact us for additional support.
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <button
              style={{
                background: ACCENT_PURPLE,
                color: WHITE,
                border: "none",
                borderRadius: 8,
                padding: "0.7rem 2rem",
                fontWeight: 700,
                fontSize: 18,
                display: "block",
                margin: "2rem auto",
              }}
              onClick={() => alert("Go to debiasing workflow!")}
            >
              Next: Make Fair →
            </button>
            {/* Metric Info Modal */}
            {modalMetric && (
              <div
                style={{
                  position: "fixed",
                  left: 0,
                  top: 0,
                  width: "100vw",
                  height: "100vh",
                  background: "rgba(80,40,120,0.18)",
                  zIndex: 9999,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => setModalMetric(null)}
              >
                <div
                  style={{
                    background: WHITE,
                    borderRadius: 14,
                    padding: "2rem 2.5rem",
                    minWidth: 260,
                    boxShadow: "0 2px 16px #b699cc44",
                    color: TEXT_PURPLE,
                    fontWeight: 600,
                  }}
                  onClick={e => e.stopPropagation()}
                >
                  <h3 style={{ color: DEEP_PURPLE, marginBottom: 8 }}>{modalMetric.name}</h3>
                  <p style={{ color: "#444", fontWeight: 400 }}>{modalMetric.description}</p>
                  <button
                    style={{
                      background: LIGHT_PURPLE,
                      color: DEEP_PURPLE,
                      border: "none",
                      borderRadius: 6,
                      padding: "0.5rem 1.5rem",
                      marginTop: 12,
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                    onClick={() => setModalMetric(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          // SUMMARY VIEW
          <div
            style={{
              background: WHITE,
              borderRadius: 20,
              boxShadow: "0 4px 24px #b699cc22",
              padding: "2.5rem 2rem",
              margin: "2rem auto",
              maxWidth: 700,
            }}
          >
            <h2 style={{ color: DEEP_PURPLE, fontWeight: 800, marginBottom: 24 }}>
              Summary: Model Fairness Issues
            </h2>
            <div style={{ fontSize: 18, color: "#ea2a5d", fontWeight: 700, marginBottom: 24 }}>
              ⚠️ Your model shows a significant bias: Group A is selected at 51%, Group B at 34%.
            </div>
            <ul style={{ fontSize: 16, color: "#444", marginBottom: 24 }}>
              <li>
                <b>Equal Opportunity Difference</b> is <b style={{ color: "#ea2a5d" }}>{equalOppDiff.toFixed(2)}</b> (should be close to 0).
              </li>
              <li>
                <b>Equalized Odds Difference</b> is <b style={{ color: "#ea2a5d" }}>{equalizedOddsDiff.toFixed(2)}</b> (should be close to 0).
              </li>
              <li>
                <b>Confusion Matrix</b> shows many false negatives for Group B.
              </li>
            </ul>
            <div style={{ marginBottom: 24 }}>
              <PieChart
                data={[
                  { title: "Equal Opportunity", value: Math.round(equalOppDiff * 100), color: ACCENT_PURPLE },
                  { title: "Equalized Odds", value: Math.round(equalizedOddsDiff * 100), color: "#ea2a5d" },
                  {
                    title: "Other",
                    value: 100 - Math.round(equalOppDiff * 100) - Math.round(equalizedOddsDiff * 100),
                    color: "#bca7f5",
                  },
                ]}
                animate
                label={({ dataEntry }) => `${dataEntry.title} ${dataEntry.value}%`}
                labelStyle={{ fontSize: "10px", fill: "#5c4a82" }}
                radius={40}
                lineWidth={40}
                style={{ maxWidth: 220, margin: "0 auto" }}
              />
            </div>
            <div style={{ color: "#444", fontSize: 16, marginBottom: 24 }}>
              <b>What this means:</b> Your model is much more likely to select Group A than Group B, which can lead to legal, ethical, and business risks. <br />
              <br />
              <b>What to do:</b> Review your data, adjust thresholds, and consider debiasing strategies to ensure fairer outcomes.
            </div>
            <button
              style={{
                background: LIGHT_PURPLE,
                color: DEEP_PURPLE,
                border: "none",
                borderRadius: 6,
                padding: "0.5rem 1.5rem",
                fontWeight: 600,
                cursor: "pointer",
                marginRight: 16,
              }}
              aria-label="Download PDF Summary"
              onClick={handleDownloadPDF}
            >
              Download PDF Summary
            </button>
            <button
              style={{
                background: ACCENT_PURPLE,
                color: WHITE,
                border: "none",
                borderRadius: 8,
                padding: "0.7rem 2rem",
                fontWeight: 700,
                fontSize: 18,
                marginLeft: 16,
              }}
              onClick={() => setTab("dashboard")}
            >
              Back to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EvaluatePage;
