import { Link } from "react-router-dom";
import logoImg from "../assets/logo.png";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logoImg} alt="fAI logo" className="logo-image" />
      </div>
      {/* <div className="nav-links">
        <Link to="/">1. Upload</Link>
        <Link to="/evaluate">2. Evaluate</Link>
        <Link to="/make-fair">3. Make Fair</Link>
      </div> */}
    </nav>
  );
}

export default Navbar;
