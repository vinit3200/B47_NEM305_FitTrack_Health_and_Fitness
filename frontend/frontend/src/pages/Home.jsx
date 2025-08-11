import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home-page" style={{ padding: "2rem", textAlign: "center" }}>
      <h1>🏋️ Welcome to FitLife</h1>
      <p>Your all-in-one fitness companion to track workouts, nutrition, goals, and progress.</p>

      {user ? (
        <div>
          <h3>Hello, {user.name}! 👋</h3>
          <Link to="/dashboard">
            <button style={{ padding: "10px 20px", marginTop: "10px" }}>
              Go to Dashboard
            </button>
          </Link>
        </div>
      ) : (
        <div style={{ marginTop: "20px" }}>
          <Link to="/login">
            <button style={{ padding: "10px 20px", marginRight: "10px" }}>Login</button>
          </Link>
          <Link to="/register">
            <button style={{ padding: "10px 20px" }}>Register</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
