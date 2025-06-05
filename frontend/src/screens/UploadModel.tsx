import { useNavigate } from "react-router-dom";
import "./UploadModel.css";
import robotImg from "../assets/robot.png";
import uploadImg from "../assets/upload.png";
import { useModelContext } from "../contexts/ModelContext";
import "../App.css";

function UploadModel() {
  const navigate = useNavigate();
  const { modelFile, setModelFile } = useModelContext();

  const handleUpload = () => {
    console.log("Upload button clicked. ModelFile is:", modelFile);
    if (!modelFile) {
      alert("Please select a model file.");
      return;
    }

    console.log("Navigating to /evaluate...");
    navigate("/evaluate");
  };

  return (
    <div className="upload-page-wrapper">
      <img src={robotImg} alt="cute robot" className="robot-icon" />

      <div className="upload-model-container">
        <h2>Upload your model here</h2>
        <h3>Supports .pkl files</h3>

        <div className="upload-box">
          {/* ✅ Use a wrapper instead of label to avoid DOM nesting bugs */}
          <div onClick={() => document.getElementById("file-upload")?.click()}>
            <img src={uploadImg} alt="Upload" className="upload-icon" style={{ cursor: "pointer" }} />
          </div>

          <input
            id="file-upload"
            type="file"
            accept=".pkl"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setModelFile(file);
              console.log("File selected:", file?.name);
            }}
          />

          {modelFile && <p className="selected-file">Selected: {modelFile.name}</p>}
        </div>

        <button onClick={handleUpload}>Evaluate</button>
      </div>
    </div>
  );
}

export default UploadModel;
