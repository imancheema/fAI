import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UploadModel.css";
import robotImg from "../assets/robot.png";
import folderImg from "../assets/folder.png";
import uploadImg from "../assets/upload.png";

import "../App.css";

function UploadModel() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a model file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        navigate("/evaluate");
      } else {
        alert(`Upload failed: ${data.error}`);
      }
    } catch (error) {
      alert("Upload failed. Please check the server.");
      console.error("Upload error:", error);
    }
  };

  return (
    <div className="upload-page-wrapper">
      <img src={robotImg} alt="cute robot" className="robot-icon" />

      <div className="upload-model-container">
        <h2>Upload your model here</h2>
        <h3>Supports .pkl files</h3>
        <div className="upload-box">
          <label htmlFor="file-upload" className="file-label">
            <img src={uploadImg} alt="Upload" className="upload-icon" />
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".pkl"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          {file && <p className="selected-file">Selected: {file.name}</p>}
        </div>

        <button onClick={handleUpload}>Evaluate</button>
      </div>
    </div>
  );
}

export default UploadModel;
