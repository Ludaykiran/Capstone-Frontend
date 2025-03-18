import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Login from "./Login";
import Navbar from "./Navbar";
import Signup from "./SignUp";
import ProtectedRoute from "./ProtectedRoute";
import ViewTrends from "./components/ViewTrends";
import LogWorkout from "./components/LogWorkout";
import TrackCalories from "./components/TrackCalories";
import Tutorials from "./components/Tutorials";
import Dashboard from "./components/Dashboard";

const App = () => {
  const [isAuthenticated, setAuthenticated] = useState(
    !!sessionStorage.getItem("authToken")
  );

  useEffect(() => {
    const authToken = sessionStorage.getItem("authToken");
    setAuthenticated(!!authToken);
  }, []);

  const userLogin = () => {
    sessionStorage.setItem("authToken", "your-jwt-token");
    setAuthenticated(true);
  };

  const userLogout = () => {
    sessionStorage.removeItem("authToken");
    setAuthenticated(false);
  };

  return (
    <Provider store={store}>
      <Router>
        <Main isAuthenticated={isAuthenticated} userLogin={userLogin} userLogout={userLogout} />
      </Router>
    </Provider>
  );
};

const Main = ({ isAuthenticated, userLogin, userLogout }) => {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/signup"];

  console.log("Main Auth Status:", isAuthenticated); // Debugging

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar userLogout={userLogout} />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login login={userLogin} />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/ViewTrends" element={<ViewTrends />} />
          <Route path="/LogWorkout" element={<LogWorkout />} />
          <Route path="/TrackCalories" element={<TrackCalories />} />
          <Route path="/Tutorials" element={<Tutorials />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;

