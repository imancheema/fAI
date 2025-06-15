import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logoImg from "../assets/logo.png";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <Link to="/">
            <img src={logoImg} alt="fAI logo" className="logo-image" />
          </Link>
        </div>

        <div className="nav-links">
          <Link
            to="/problem"
            className={location.pathname === "/problem" ? "active" : ""}
          >
            Problem
          </Link>
          <Link
            to="/about"
            className={location.pathname === "/about" ? "active" : ""}
          >
            About
          </Link>

          {/* ✅ Replace Get Started with Contact Us */}
          <button className="contact-btn" onClick={() => setShowForm(true)}>
            Contact Us
          </button>
        </div>
      </nav>

      {/* Modal for Contact */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Let's Chat 🤝</h2>
            <p className="subtitle">
              Tell us what you're building — and how we can help!
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thanks! We’ll get back to you shortly 🚀");
                setShowForm(false);
              }}
            >
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <textarea
                placeholder="What's your use case? Ask us anything!"
                required
              />
              <button type="submit" className="submit-btn">
                ✨ Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
