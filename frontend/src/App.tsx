import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import UploadModel from "./screens/UploadModel";
import Evaluate from "./screens/Evaluate";
import LandingPage from "./screens/LandingPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/upload" element={<UploadModel />} />
        <Route path="/evaluate" element={<Evaluate />} />
      </Routes>
    </Router>
  );
}

export default App;
