import React from "react";
import "./MetricsPage.css";

const MetricsPage = () => (
  <div className="metrics-main">
    <h1 className="metrics-title">
      Metrics & Fairness Evaluation
    </h1>
    <p className="metrics-subtitle">
      <em>
        Measuring and tracking fairness in AI-driven resume screening.
      </em>
    </p>

    <div className="metrics-illustration">
      {/* Optional: Place an illustration here, similar to ProblemPage */}
      {/* <img src={require("../assets/metrics-illustration.png")} alt="Metrics Illustration" /> */}
    </div>

    <section>
      <h2 className="metrics-section-header">Why Metrics Matter in Fair Hiring</h2>
      <p>
        To ensure AI-driven resume screening is both accurate and equitable, we evaluate our models using fairness metrics. These metrics help us quantify and reduce gender bias, moving towards a fairer hiring process for all candidates.
      </p>
    </section>

    <section>
      <h2 className="metrics-section-header">Key Metrics Used</h2>
      <ul>
        <li>
          <strong>Equal Opportunity:</strong> Measures the difference in true positive rates (TPR) between groups (e.g., men and women). Lower gaps indicate fairer outcomes.
        </li>
        <li>
          <strong>Equalized Odds:</strong> Evaluates differences in both TPR and false positive rates (FPR) across groups. A fair model has minimal gaps for both.
        </li>
        <li>
          <strong>Disparity:</strong> General term for any measurable difference in model outcomes between demographic groups.
        </li>
        <li>
          <strong>Accuracy:</strong> Overall correctness of the model’s predictions, ensuring fairness improvements do not sacrifice performance.
        </li>
      </ul>
    </section>

    <section>
      <h2 className="metrics-section-header">How We Debias</h2>
      <p>
        We use <strong>adversarial debiasing</strong>: training an adversary to detect gender from the model’s internal representations, then optimizing the model to minimize both prediction error and detectable gender bias. This approach reduces bias by over 23% with less than 2% drop in accuracy.
      </p>
    </section>

    <section>
      <h2 className="metrics-section-header">Reference Research</h2>
      <p>
        Inspired by:<br/>
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