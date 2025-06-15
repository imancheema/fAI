import React from "react";
import "./ProblemPage.css";
import biasImg from "../assets/bias-example.png"; // optional if you still want to include this image
import Problem from "../assets/problem.png";
const ProblemPage = () => {
  return (
    <div className="page-wrapper">
      <div className="content-container">
        <h1 className="problem-title">
          Tackling Bias in Resume Screening: Building a Fairer Hiring Future
        </h1>
        <p className="image-caption">
          A stack of resumes overlaid with algorithmic patterns.
        </p>

        <p className="body-text">
          AI is widely used to screen resumes, but biased training data or model
          design can lead to unfair outcomes for underrepresented groups. Our
          goal is to uncover these hidden biases and help organizations build
          ethical, transparent, and fair hiring tools.
        </p>
        <img
          src={Problem}
          alt="Example of bias in resume screening"
          className="problem-image"
        />

        <h2 className="section-heading">What is the problem?</h2>
        <p className="body-text">
          Automated resume screening tools aim to streamline hiring, but many
          adopt biases from the data they’re trained on.
        </p>
        <p className="body-text">
          In 2018, Amazon abandoned its AI recruiting tool after it penalized
          resumes with terms like 'women’s' or from all-women’s colleges — a
          result of training on male-dominated hiring data. These tools often
          operate with little transparency, raising key questions: Who gets
          excluded? Who gets advanced? And why?"
        </p>

        <h2 className="section-heading">Why does it matter?</h2>
        <p className="body-text">
          Biased AI in hiring reinforces inequality and excludes qualified
          candidates. This harms individuals and impacts diversity, innovation,
          and reputation. As automation grows, fairness is crucial for trust and
          competitiveness.
        </p>

        <h2 className="section-heading">How do we help?</h2>
        <p className="body-text">
          We help you audit, debias, and evaluate your resume screening models
          using advanced fairness metrics and adversarial techniques. Our
          platform:
        </p>
        <ul className="custom-list">
          <li>Detects hidden biases</li>
          <li>Provides clear fairness scores</li>
          <li>
            Guides you on mitigation options, from automated fixes to expert
            support
          </li>
        </ul>
        <p className="body-text">
          Whether new or experienced with AI hiring, we make improving your
          models simple.
        </p>

        <h2 className="section-heading">Who should get involved?</h2>
        <p className="body-text">We work with:</p>
        <ul className="custom-list">
          <li>Startups building AI recruitment tools</li>
          <li>Enterprises seeking fairness audits</li>
          <li>HR teams looking to embed equity into their processes</li>
          <li>Researchers and policymakers exploring bias in hiring tech</li>
        </ul>
        <p className="body-text">
          You don’t need to be an AI expert — just someone who believes in fair
          opportunity.
        </p>

        <h2 className="section-heading">How can you support this work?</h2>
        <p className="body-text">
          If you’d like to collaborate, contribute research, or bring fairness
          to your organization’s hiring tools, feel free to contact us!
        </p>

        <blockquote className="quote-box">
          <p>
            “AI should support opportunity, not limit it. We’re here to make
            sure the technology works for everyone — not just those who trained
            it.”
          </p>
          <cite>— The fAI Team</cite>
        </blockquote>
      </div>
    </div>
  );
};

export default ProblemPage;
