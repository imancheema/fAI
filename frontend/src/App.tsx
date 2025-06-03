import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import UploadModel from "./screens/UploadModel";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<UploadModel />} />
      </Routes>
    </Router>
  );
}

export default App;
