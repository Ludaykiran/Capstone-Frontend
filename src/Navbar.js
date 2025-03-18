import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-purple px-3 nav-style">
      <NavLink className="navbar-brand" to="/">
        <span style={{ color: "green", fontWeight: "bold" }}>FitTrack⛹️</span>
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <NavLink className="nav-link link-style" to="/Dashboard">
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link link-style" to="/LogWorkout">
              LogWorkout
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link link-style" to="/TrackCalories">
              TrackCalories
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link link-style" to="/ViewTrends">
              ViewTrends
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link link-style" to="/Tutorials">
              Tutorials
            </NavLink>
          </li>
        </ul>
        <button 
          className="btn btn-danger text-white px-3 py-2"
          style={{ width: "100px" }}
          onClick={handleLogout}>
            Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;