import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ModelProvider } from "./contexts/ModelContext";
import UploadModel from "./screens/UploadModel";
import EvaluatePage from "./screens/Evaluate";
import LandingPage from "./screens/LandingPage";
import MakeFairPage from "./screens/MakeFair";

function App() {
  return (
    <ModelProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/upload" element={<UploadModel />} />
          <Route path="/evaluate" element={<EvaluatePage />} />
          <Route path="/make-fair" element={<MakeFairPage />} />
        </Routes>
      </Router>
    </ModelProvider>
  );
}

export default App;
