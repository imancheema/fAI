import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ModelProvider } from "./contexts/ModelContext";
import UploadModel from "./screens/UploadModel";
import EvaluatePage from "./screens/Evaluate";
import LandingPage from "./screens/LandingPage";
import MakeFairPage from "./screens/MakeFair";

// 🆕 Import new screens
import ProblemPage from "./screens/ProblemPage";
import SolutionPage from "./screens/SolutionPage";
import AboutPage from "./screens/AboutPage";

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

          {/* 🆕 Add new non-scrollable section routes */}
          <Route path="/problem" element={<ProblemPage />} />
          <Route path="/solution" element={<SolutionPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Router>
    </ModelProvider>
  );
}

export default App;
