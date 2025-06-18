import React, { useState } from "react";
import "./FAQ.css";



const faqs = [
  {
    question: "How fast can I get a fairness-certified model?",
    answer:
      "Most models are certified in under a week. For urgent cases, contact us for priority processing.",
  },
  {
    question: "What file formats do you accept?",
    answer:
      "We accept .pkl, .joblib, .onnx, .h5, .pt, .sav for models and .csv, .xlsx, .xls for data. See Upload Instructions for details.",
  },
  {
    question: "Is my data confidential?",
    answer:
      "Absolutely. All files are handled securely and confidentially. We never share your data.",
  },
  {
    question: "What happens after I choose a service tier?",
    answer:
      "Our team will contact you within one business day to confirm details and begin the debiasing process.",
  },
  {
    question: "Do I need to remove sensitive information?",
    answer:
      "Remove any personal identifiers unless specifically required for fairness analysis. See our Upload Instructions page for tips.",
  },
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);


  return (
    <div className="page-wrapper">
      <div className="content-container">
        <h1 className="faq-title">Frequently Asked Questions</h1>
        <div className="faq-list">
          {faqs.map((faq, idx) => (
            <div key={idx} className={`faq-item${openIndex === idx ? " open" : ""}`}>
              <button
                className="faq-question"
                aria-expanded={openIndex === idx}
                aria-controls={`faq-answer-${idx}`}
                id={`faq-question-${idx}`}
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                {faq.question}
                <span className="faq-toggle">{openIndex === idx ? "−" : "+"}</span>
              </button>
              <div
                className="faq-answer"
                id={`faq-answer-${idx}`}
                role="region"
                aria-labelledby={`faq-question-${idx}`}
                style={{ maxHeight: openIndex === idx ? "180px" : "0" }}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
export{}