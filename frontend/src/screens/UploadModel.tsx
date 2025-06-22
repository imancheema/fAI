import React, { useRef, useState, useEffect } from "react";
import { useModelContext } from "../contexts/ModelContext";
import { useNavigate } from "react-router-dom";
import Steps from "../components/Steps";
import "./UploadModel.css";
import { FaUpload } from "react-icons/fa";

function UploadModel() {
  const { modelFile, setModelFile } = useModelContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setModelFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [setModelFile]);
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
          navigate("/evaluate");
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
    <div>
      <main>
        <Steps />
        <section>
          <h2>Upload your model</h2>
          <p>
            Select your .pkl file and click Evaluate to check for fairness. We
            do not store any files.
          </p>
          <p>
            Note: Max file size is 10MB. If you have questions, visit our
            contact page.
          </p>
        </section>

        <div
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
        >
          <input
            type="file"
            ref={fileInputRef}
            accept=".pkl"
            onChange={handleFileChange}
            disabled={uploading}
          />
          {modelFile ? (
            <div>
              <p>File: {modelFile.name}</p>
              <p>Status: Ready</p>
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>
              <span className="upload-icon" aria-label="Upload icon">
                {/* @ts-ignore */}
                <FaUpload />
              </span>
              <p>Click or drop your file here</p>
            </div>
          )}
        </div>

        {uploading && (
          <div>
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
