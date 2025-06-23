import React from "react";
import "./MetricsPage.css";

const MetricsPage = () => (
  <div className="metrics-main">
    <h1 className="metrics-title">
      Metrics & Fairness Evaluation
    </h1>
    <p className="metrics-subtitle">
      <em>
        How we measure and communicate fairness in AI-driven resume screening.
      </em>
    </p>

    <section>
      <h2 className="metrics-section-header">Why Metrics Matter in Fair Hiring</h2>
      <p>
        To ensure our AI-driven resume screening is both accurate and equitable, we rely on fairness metrics. These help us identify, quantify, and reduce gender bias, supporting a fairer hiring process for all candidates.
      </p>
    </section>

    <div className="metrics-cards-stack">
      {/* Equalized Odds */}
      <div className="metric-card">
        <div className="metric-card-title">Equalized Odds</div>
        <div className="metric-card-ref">Zhang et al., 2018</div>
        <div className="metric-card-section">
          <b>Definition:</b> Requires that both the <b>true positive rate (TPR)</b> and <b>false positive rate (FPR)</b> are equal across groups (e.g., men and women).
        </div>
        <div className="metric-card-section">
          <b>Formula:</b>
          <div className="metric-formula">
            <div className="formula-normal">TPR<sub>group A</sub> = TPR<sub>group B</sub></div>
            <div className="formula-normal">FPR<sub>group A</sub> = FPR<sub>group B</sub></div>
            <div className="formula-bold">
              TPR = TP / (TP + FN),&nbsp; FPR = FP / (FP + TN)
            </div>
          </div>
        </div>
        <div className="metric-card-section">
          <b>Bias Levels:</b>
          <ul>
            <li><span className="bias-low">Low bias (green):</span> TPR and FPR gaps &lt; 5% — Model is fair across groups.</li>
            <li><span className="bias-medium">Medium bias (yellow):</span> TPR or FPR gaps 5–15% — Some disparity; monitor closely.</li>
            <li><span className="bias-high">High bias (red):</span> TPR or FPR gaps &gt; 15% — Model is systematically less accurate for at least one group.</li>
          </ul>
        </div>
        <div className="metric-card-section">
          <b>Why it matters:</b> Ensures the model is equally accurate (and inaccurate) for all groups, preventing systematic advantage or disadvantage.
        </div>
        <div className="metric-card-section metric-card-dashboard">
          <b>In our dashboard:</b> The Equalized Odds card shows bias level and color-codes it for quick scanning.
        </div>
      </div>

      {/* Equal Opportunity */}
      <div className="metric-card">
        <div className="metric-card-title">Equal Opportunity</div>
        <div className="metric-card-ref">Zhang et al., 2018</div>
        <div className="metric-card-section">
          <b>Definition:</b> Focuses on <b>true positive rate (TPR)</b> only, requiring equal TPR across groups.
        </div>
        <div className="metric-card-section">
          <b>Formula:</b>
          <div className="metric-formula">
            <div className="formula-normal">TPR<sub>group A</sub> = TPR<sub>group B</sub></div>
            <div className="formula-bold">TPR = TP / (TP + FN)</div>
          </div>
        </div>
        <div className="metric-card-section">
          <b>Bias Levels:</b>
          <ul>
            <li><span className="bias-low">Low bias (green):</span> TPR gap &lt; 5% — Qualified candidates have equal opportunity.</li>
            <li><span className="bias-medium">Medium bias (yellow):</span> TPR gap 5–15% — Some groups may be overlooked.</li>
            <li><span className="bias-high">High bias (red):</span> TPR gap &gt; 15% — Model is much more likely to miss qualified candidates from at least one group.</li>
          </ul>
        </div>
        <div className="metric-card-section">
          <b>Why it matters:</b> Prevents the model from overlooking qualified candidates from any group, a key concern in fair hiring.
        </div>
        <div className="metric-card-section metric-card-dashboard">
          <b>In our dashboard:</b> The Equal Opportunity card highlights if any group is being overlooked, with color-coded bias levels.
        </div>
      </div>

      {/* Confusion Matrix */}
      <div className="metric-card">
        <div className="metric-card-title">Confusion Matrix</div>
        <div className="metric-card-section">
          <b>Definition:</b> A table summarizing model predictions for each group:
          <ul>
            <li><b>TP:</b> Qualified candidates correctly selected</li>
            <li><b>FP:</b> Unqualified candidates incorrectly selected</li>
            <li><b>TN:</b> Unqualified candidates correctly rejected</li>
            <li><b>FN:</b> Qualified candidates incorrectly rejected</li>
          </ul>
        </div>
        <div className="metric-card-section">
          <b>Formulas:</b>
          <div className="metric-formula">
            <div className="formula-bold">TPR = TP / (TP + FN)</div>
            <div className="formula-bold">FPR = FP / (FP + TN)</div>
            <div className="formula-bold">Accuracy = (TP + TN) / (TP + FP + TN + FN)</div>
          </div>
        </div>
        <div className="metric-card-section">
          <b>Bias Levels:</b>
          <ul>
            <li><span className="bias-low">Low bias (green):</span> Error rates nearly equal across groups — Model is consistent.</li>
            <li><span className="bias-medium">Medium bias (yellow):</span> Noticeable difference in error rates — Some groups experience more mistakes.</li>
            <li><span className="bias-high">High bias (red):</span> Large error rate gaps between groups — Model is much less reliable for at least one group.</li>
          </ul>
        </div>
        <div className="metric-card-section">
          <b>Why it matters:</b> The confusion matrix is the foundation for all fairness metrics. It helps you see if errors are concentrated in one group.
        </div>
        <div className="metric-card-section metric-card-dashboard">
          <b>In our dashboard:</b> The Confusion Matrix card lets you compare error types for each group, visually and instantly.
        </div>
      </div>
    </div>

    <section>
      <h2 className="metrics-section-header">How We Debias</h2>
      <p>
        We use <strong>adversarial debiasing</strong>: our model learns to minimize both prediction error and detectable gender bias, inspired by <a href="https://dl.acm.org/doi/10.1145/3278721.3278779" target="_blank" rel="noopener noreferrer">Zhang et al., 2018</a>. This reduces bias by over 23% with minimal impact on accuracy.
      </p>
    </section>

    <section>
      <h2 className="metrics-section-header">Reference Research</h2>
      <p>
        <strong>Zhang, B. H., Lemoine, B., & Mitchell, M. (2018).</strong> Mitigating unwanted biases with adversarial learning. <em>AAAI/ACM Conference on AI, Ethics, and Society</em>.<br/>
        <a
          href="https://dl.acm.org/doi/10.1145/3278721.3278779"
          target="_blank"
          rel="noopener noreferrer"
          className="metrics-link"
        >
          Read the paper
        </a>
      </p>
    </section>
  </div>
);

export default MetricsPage;
