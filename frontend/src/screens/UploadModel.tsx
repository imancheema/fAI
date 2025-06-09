import React, { useRef, useState } from "react";
import robotImg from "../assets/robot.png";
import { useModelContext } from "../contexts/ModelContext";
import "../App.css";
import "./UploadModel.css";
import { useNavigate } from "react-router-dom";


function UploadModel() {
  const { modelFile, setModelFile } = useModelContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  

  const handleUpload = () => {
    if (!modelFile) {
      alert("Please select a model file.");
      return;
    }
    setUploading(true);
    setProgress(0);
    let prog = 0;
  
    const interval = setInterval(() => {
      prog += 10;
      setProgress(prog);
      if (prog >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setUploading(false);
          navigate("/evaluate"); // ✅ Go to the next screen after upload completes
        }, 400);
      }
    }, 70);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setModelFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0] || null;
    if (file) setModelFile(file);
  };

  return (
    <div className="upload-3col-layout">
      {/* Left Panel */}
      <aside className="upload-col col-left">
        <div className="info-card glass">
          <h4>How It Works</h4>
          <ol>
            <li>Select your <b>.pkl</b> model file</li>
            <li>Click <b>Evaluate</b></li>
            <li>See fairness results instantly</li>
          </ol>
          <div className="side-tip">
            Max file size: <strong>10MB</strong><br />
            Files are <strong>not stored</strong><br />
            Questions? <a href="/contact">Contact us</a>
          </div>
        </div>
      </aside>

      {/* Center Panel */}
      <main className="upload-col col-center">
        <div className="upload-timeline">
          <div className="timeline-step active">📤 Upload</div>
          <span className="timeline-arrow">→</span>
          <div className="timeline-step">📊 Dashboard</div>
          <span className="timeline-arrow">→</span>
          <div className="timeline-step">🛠️ Debias</div>
        </div>
        <img src={robotImg} alt="Robot mascot" className="center-robot" />
        <div className="upload-model-container glass">
          <h2 className="upload-title">Drop Your Model</h2>
          <p className="upload-helper">.pkl files only, please 🪄</p>

          <div
            className={`upload-box${dragActive ? " drag-active" : ""}`}
            onClick={() => !uploading && fileInputRef.current?.click()}
            onKeyDown={e => (e.key === "Enter" || e.key === " ") && !uploading && fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            tabIndex={0}
            role="button"
            aria-label="File upload area"
          >
            <svg className="upload-icon" width="38" height="38" fill="none" viewBox="0 0 24 24">
              <path d="M12 16V4M12 4l-5 5M12 4l5 5" stroke="#ea2a5d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="3" y="16" width="18" height="4" rx="2" fill="#ffe6ef" stroke="#ea2a5d" strokeWidth="1"/>
            </svg>
            <input
              type="file"
              ref={fileInputRef}
              id="file-upload"
              accept=".pkl"
              style={{ display: "none" }}
              onChange={handleFileChange}
              disabled={uploading}
            />
            {modelFile ? (
              <div className="file-preview">
                <span className="file-icon">📦</span>
                <span className="file-name">{modelFile.name}</span>
                <span className="file-status">✅ Ready!</span>
              </div>
            ) : (
              <span className="upload-instruct"><b>Click or drop a file here</b></span>
            )}
          </div>

          {uploading && (
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
            </div>
          )}

          <button className="upload-btn" onClick={handleUpload} disabled={uploading}>
            🚀 Evaluate
          </button>
        </div>
      </main>

      {/* Right Panel */}
      <aside className="upload-col col-right">
        <div className="visual-card glass">
          <div className="side-robot-icon">🤖</div>
          <div className="side-stat">
            ✨ 92% of users discover hidden bias on first try!
          </div>
          <div className="side-quote">
            "Fair AI means better opportunities for everyone."
          </div>
        </div>
      </aside>
    </div>
  );
}

export default UploadModel;
