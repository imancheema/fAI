import { useState } from "react";
import "./UploadModel.css";

function UploadModel() {
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
        alert(data.message);
      } else {
        alert(`Upload failed: ${data.error}`);
      }
    } catch (error) {
      alert("Upload failed. Please check the server.");
      console.error("Upload error:", error);
    }
  };

  return (
    <div className="upload-model-container">
      <h2>Upload Model</h2>

      <div className="upload-box">
        <div className="folder-icon">📁</div>
        <input
          type="file"
          accept=".pkl"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        {file && <p className="selected-file">Selected: {file.name}</p>}
      </div>

      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default UploadModel;
