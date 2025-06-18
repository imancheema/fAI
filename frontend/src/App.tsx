import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ModelProvider } from "./contexts/ModelContext";
import UploadModel from "./screens/UploadModel";
import EvaluatePage from "./screens/Evaluate";
import LandingPage from "./screens/LandingPage";
import MakeFairPage from "./screens/MakeFair";
import ProblemPage from "./screens/ProblemPage";
import SolutionPage from "./screens/SolutionPage";
import AboutPage from "./screens/AboutPage";
import UploadInstructions from "./screens/UploadInstructions"; // <-- ADD THIS IMPORT
import Debias from "./screens/Debias";
import FAQ from "./screens/FAQ";

function App() {
  return (
    <ModelProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/upload" element={<UploadModel />} />
          <Route path="/upload-instructions" element={<UploadInstructions />} />
          <Route path="/evaluate" element={<EvaluatePage />} />
          <Route path="/makefair" element={<MakeFairPage />} /> {/* Use MakeFairPage only */}
          <Route path="/debias" element={<Debias />} />
          <Route path="/problem" element={<ProblemPage />} />
          <Route path="/solution" element={<SolutionPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </Router>
    </ModelProvider>
  );
}

export default App;
