import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useModelContext } from "../contexts/ModelContext";
import robotImg from "../assets/robot2.png";
import "./EvaluatePage.css";

// FAQ Data
const faqs = [
  {
    question: "How fast can I get a fairness-certified model?",
    answer: "Most models are certified in under a week. For urgent cases, contact us for priority processing.",
  },
  {
    question: "What file formats do you accept?",
    answer: "We accept most common model formats including .pkl, .joblib, .onnx, and .h5. See our Upload Instructions page for details.",
  },
  {
    question: "Is my data confidential?",
    answer: "Absolutely. All files are handled securely and confidentially. We never share your data.",
  },
  {
    question: "What happens after I choose a service tier?",
    answer: "Our team will contact you within one business day to confirm details and begin the debiasing process.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);


  return (
    <div className="faq-section" style={{ maxWidth: 700, margin: "2rem auto 0", background: "#fff6f8", borderRadius: 16, padding: "2rem" }}>
      <h3 style={{ textAlign: "center", color: "#32000c", marginBottom: 24 }}>Frequently Asked Questions</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {faqs.map((faq, i) => (
          <li key={i} style={{ marginBottom: 18 }}>
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              aria-expanded={openIndex === i}
              style={{
                width: "100%",
                textAlign: "left",
                background: "#ffe6ef",
                border: "none",
                borderRadius: 8,
                padding: "1rem",
                fontWeight: 600,
                color: "#ea2a5d",
                fontSize: "1.08rem",
                cursor: "pointer",
                boxShadow: openIndex === i ? "0 2px 8px #ea2a5d22" : "none",
                transition: "box-shadow 0.2s"
              }}
            >
              {faq.question}
            </button>
            {openIndex === i && (
              <div style={{
                background: "#fff",
                borderRadius: "0 0 8px 8px",
                padding: "1rem",
                color: "#32000c",
                border: "1px solid #ffe6ef",
                borderTop: "none"
              }}>
                {faq.answer}
              </div>
            )}
          </li>
        ))}
      </ul>
      <div style={{ textAlign: "center", marginTop: 24 }}>
        <a
          href="/upload-instructions"
          style={{
            color: "#ea2a5d",
            fontWeight: 600,
            textDecoration: "underline",
            fontSize: "1.05rem"
          }}
        >
          See Upload Instructions
        </a>
      </div>
    </div>
  );
};

const MakeFairPage = () => {
  const [submittedTier, setSubmittedTier] = useState<"tier1" | "tier2" | null>(null);
  const [isTyping, setIsTyping] = useState(true);
  const { modelFile } = useModelContext();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsTyping(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  const handleTierSubmit = (tier: "tier1" | "tier2") => {
    setSubmittedTier(tier);
  };

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
        <div className="timeline-step active">
          <span role="img" aria-label="Debias">🛠️</span> Debias
        </div>
      </div>

      {/* Main content centered under timeline */}
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
          Make Your Model Fair
        </h2>
        <p
          className="intro-text"
          style={{
            maxWidth: 620,
            margin: "0 auto 1.5rem",
            color: "#5a2731",
            textAlign: "center",
            fontSize: "1.08rem"
          }}
        >
          AI models can unintentionally make unfair decisions, especially for underrepresented groups. We help you detect and reduce bias, so your models treat everyone equitably. For example, we've detected a <b>32% disparity for female applicants</b> in your uploaded model.
        </p>

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
          <p><strong>DETECTED ISSUE:</strong> 32% disparity for female applicants</p>
        </div>

        <div className="charts-section" style={{ display: "flex", justifyContent: "center" }}>
          <div
            className="chart-card"
            style={{
              width: 420,
              background: "#fff6f8",
              borderRadius: 20,
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
              padding: "2rem",
              marginBottom: 24,
              border: "1.5px dashed #ea2a5d"
            }}
          >
            <img src={robotImg} alt="Robot" className="robot-img" style={{ width: 120, marginBottom: 16 }} />
            {isTyping ? (
              <p className="typing-text">Analyzing disparities in your model...</p>
            ) : submittedTier ? (
              <>
                <p className="success-message" style={{ color: "green" }}>
                  ✅ {submittedTier === "tier1"
                    ? "Debiasing request received. We'll notify you when it's done."
                    : "Collaboration request received. Our team will reach out to set up a session."}
                </p>
                <button className="next-btn" style={{ marginTop: 24 }} onClick={() => navigate("/")}>
                  ⬅ Back to Home
                </button>
              </>
            ) : (
              <>
                <p className="summary-text" style={{ marginBottom: 24 }}>
                  Choose how you'd like to make your model fair:
                </p>
                <div className="tier-options" style={{ display: "flex", gap: 20, flexDirection: "column" }}>
                  <div
                    className="tier-card"
                    style={{
                      background: "#fff",
                      borderRadius: 16,
                      padding: 20,
                      border: "1.5px solid #ea2a5d",
                      textAlign: "left"
                    }}
                  >
                    <h4 style={{ color: "#ea2a5d", margin: "0 0 8px" }}>Tier 1: We Debias For You</h4>
                    <ul style={{ margin: 0, paddingLeft: 20, fontSize: "1rem" }}>
                      <li>We handle debiasing using our data and techniques</li>
                      <li>Fast turnaround, minimal effort for your team</li>
                      <li>Receive a certified, fairer model</li>
                    </ul>
                    <button
                      className="submit-btn"
                      style={{ marginTop: 12 }}
                      onClick={() => handleTierSubmit("tier1")}
                    >
                      ✅ Choose Tier 1
                    </button>
                  </div>
                  <div
                    className="tier-card"
                    style={{
                      background: "#fff",
                      borderRadius: 16,
                      padding: 20,
                      border: "1.5px solid #ea2a5d",
                      textAlign: "left"
                    }}
                  >
                    <h4 style={{ color: "#ea2a5d", margin: "0 0 8px" }}>Tier 2: Work With Us</h4>
                    <ul style={{ margin: 0, paddingLeft: 20, fontSize: "1rem" }}>
                      <li>Collaborate with our team to debias your model</li>
                      <li>Hands-on support, adversarial training, infrastructure setup</li>
                      <li>Build long-term fairness into your workflow</li>
                    </ul>
                    <button
                      className="submit-btn"
                      style={{ marginTop: 12 }}
                      onClick={() => handleTierSubmit("tier2")}
                    >
                      🤝 Choose Tier 2
                    </button>
                  </div>
                </div>
                <div
                  style={{
                    marginTop: 28,
                    fontSize: "0.98rem",
                    color: "#32000c",
                    background: "#ffe3ec",
                    padding: "1rem",
                    borderRadius: 12
                  }}
                >
                  <b>Showcase Your Commitment:</b> Companies that work with us can display a "Fair AI" badge to highlight their dedication to responsible AI.
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
};

export default MakeFairPage;
