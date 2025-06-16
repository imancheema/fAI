import React, { useState } from "react";
import { MdCheckCircle, MdBuild, MdPeople } from "react-icons/md";
import { GiAchievement } from "react-icons/gi";
import "./Debias.css";
import Steps from "../components/Steps";

const Debias = () => {
  const [chosenTiers, setChosenTiers] = useState<{ [key: number]: boolean }>(
    {}
  );

  const handleChooseTier = (tier: number) => {
    setChosenTiers((prev) => ({ ...prev, [tier]: true }));
  };

  return (
    <main className="debias-container">
      <Steps />
      <h2 className="debias-title">Make your model fair</h2>
      <p className="debias-description">
        Choose how you'd like to make your model fair. Whether you want us to
        handle it or collaborate closely with our experts, you are taking a step
        toward responsible AI.
      </p>

      <section className="tier-card">
        <h3 className="tier-title">
          <span className="tier-icon">
            <MdBuild />
          </span>
          Tier 1: We Debias For You
        </h3>
        <ul>
          <li>
            <span className="icon">
              <MdCheckCircle />
            </span>
            We manage the entire debiasing process using our expertise and data
          </li>
          <li>
            <span className="icon">
              <MdCheckCircle />
            </span>
            Fast delivery with minimal involvement from your team
          </li>
          <li>
            <span className="icon">
              <MdCheckCircle />
            </span>
            Receive a validated, fairness-certified model ready for deployment
          </li>
        </ul>

        {chosenTiers[1] ? (
          <p className="confirmation-message">
            Debiasing request received. We'll notify you when it's done.
          </p>
        ) : (
          <button
            className="choose-tier-btn"
            onClick={() => handleChooseTier(1)}
          >
            Choose Tier 1
          </button>
        )}
      </section>

      <section className="tier-card">
        <h3 className="tier-title">
          <span className="tier-icon">
            <MdPeople />
          </span>
          Tier 2: Work With Us
        </h3>
        <ul>
          <li>
            <span className="icon">
              <MdCheckCircle />
            </span>
            Work closely with our team to improve your model’s fairness
          </li>
          <li>
            <span className="icon">
              <MdCheckCircle />
            </span>
            Gain hands-on support with adversarial training and fairness
            techniques
          </li>
          <li>
            <span className="icon">
              <MdCheckCircle />
            </span>
            Establish infrastructure to integrate fairness into your ongoing
            workflows
          </li>
        </ul>

        {chosenTiers[2] ? (
          <p className="confirmation-message">
            Debiasing request received. We'll notify you when it's done.
          </p>
        ) : (
          <button
            className="choose-tier-btn"
            onClick={() => handleChooseTier(2)}
          >
            Choose Tier 2
          </button>
        )}
      </section>

      <div className="fair-ai-badge-info">
        <span className="tier-icon-badge">
          <GiAchievement />
        </span>
        <strong>Showcase Your Commitment:</strong> Companies that work with us
        can display a <span className="badge-label">“Fair AI”</span> badge to
        highlight their dedication to responsible AI.
      </div>
    </main>
  );
};

export default Debias;
