import React, { useRef, useState, useEffect } from "react";
import { useModelContext } from "../contexts/ModelContext";
import { useNavigate, Link } from "react-router-dom";
import Steps from "../components/Steps";
import "./UploadModel.css";

function UploadModel() {
  const { modelFile, setModelFile } = useModelContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setModelFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [setModelFile]);

  const handleUpload = () => {
    if (!modelFile) {
      setError("Please select a model file.");
      return;
    }
    setError(null);
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
          navigate("/evaluate");
        }, 400);
      }
    }, 70);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && file.size > 10 * 1024 * 1024) {
      setError("File too large. Max size is 10MB.");
      setModelFile(null);
      e.target.value = "";
      return;
    }
    if (file && !file.name.endsWith(".pkl")) {
      setError("Invalid file type. Only .pkl files are allowed.");
      setModelFile(null);
      e.target.value = "";
      return;
    }
    setError(null);
    setModelFile(file);
    e.target.value = "";
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
    if (file && file.size > 10 * 1024 * 1024) {
      setError("File too large. Max size is 10MB.");
      setModelFile(null);
      return;
    }
    if (file && !file.name.endsWith(".pkl")) {
      setError("Invalid file type. Only .pkl files are allowed.");
      setModelFile(null);
      return;
    }
    setError(null);
    setModelFile(file);
  };

  return (
    <div className="upload-bg">
      {/* Animated blobs for extra depth */}
      <div className="blob-bg" aria-hidden="true">
        <div className="blob blob1"></div>
        <div className="blob blob2"></div>
        <div className="blob blob3"></div>
      </div>
      {/* Foreground card for clarity */}
      <main className="upload-card">
        {/* Personalized/Contextual Greeting */}
        <div className="greeting-row">
          <span role="img" aria-label="wave" style={{ fontSize: "1.5rem", marginRight: 8 }}>👋</span>
          <span>
            Welcome! Need help?{" "}
            <Link
              to="/upload-instructions"
              className="greeting-link"
              style={{ color: "#ea2a5d", fontWeight: 600, textDecoration: "underline" }}
            >
              See our upload guide
            </Link>.
          </span>
        </div>
        <Steps />
        <section>
          <h2>Upload your model</h2>
          <p>
            Select your <b>.pkl</b> file and click <b>Evaluate</b> to check for fairness. We do not store any files.
          </p>
          <p>
            <span style={{ color: "#a783f7" }}>Note:</span> Max file size is 10MB. If you have questions, visit our contact page.
          </p>
        </section>
        {/* Enhanced File Feedback */}
        <div
          className={dragActive ? "drag-active" : ""}
          onClick={() => !uploading && fileInputRef.current?.click()}
          onKeyDown={(e) =>
            (e.key === "Enter" || e.key === " ") &&
            !uploading &&
            fileInputRef.current?.click()
          }
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          tabIndex={0}
          role="button"
          aria-label="File upload drop zone"
        >
          <input
            type="file"
            ref={fileInputRef}
            accept=".pkl"
            onChange={handleFileChange}
            disabled={uploading}
          />
          {modelFile ? (
            <div className="file-card">
              <span className="file-icon" role="img" aria-label="file">📄</span>
              <span className="file-name">{modelFile.name}</span>
              <button
                className="remove-btn"
                onClick={e => {
                  e.stopPropagation();
                  setModelFile(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                  }
                }}
                aria-label="Remove file"
                type="button"
              >✖</button>
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>
              <span className="upload-icon" aria-label="Upload icon">⬆️</span>
              <p>Click or drop your file here</p>
              <p style={{ fontSize: "0.92rem", color: "#a783f7", margin: 0, marginTop: "0.5rem" }}>
                .pkl only · Max 10MB
              </p>
            </div>
          )}
        </div>
        {error && (
          <div style={{ color: "#ea2a5d", marginBottom: "1rem", fontWeight: 600 }}>
            {error}
          </div>
        )}
        {uploading && (
          <div className="upload-progress" aria-live="polite">
            <div style={{ width: `${progress}%` }} />
            <p>Uploading... {progress}%</p>
          </div>
        )}
        <button onClick={handleUpload} disabled={uploading}>
          Evaluate
        </button>
      </main>
    </div>
  );
}

export default UploadModel;
