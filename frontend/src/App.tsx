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
import MakeFair from "./screens/MakeFair";
import Debias from "./screens/Debias";
import MetricsPage from "./screens/MetricsPage";

function App() {
  return (
    <ModelProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/upload" element={<UploadModel />} />
          <Route path="/evaluate" element={<EvaluatePage />} />
          <Route path="/makefair" element={<MakeFair />} />
          <Route path="/debias" element={<Debias />} />
          <Route path="/problem" element={<ProblemPage />} />
          <Route path="/solution" element={<SolutionPage />} />
          <Route path="/aboutus" element={<AboutPage />} />
          <Route path="/metrics" element={<MetricsPage />} />
        </Routes>
      </Router>
    </ModelProvider>
  );
}

export default App;
