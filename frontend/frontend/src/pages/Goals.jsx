import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

const Goals = () => {
  const { user } = useAuth();
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState("");

  const fetchGoals = async () => {
    try {
      const res = await axiosInstance.get("/goals");
      setGoals(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addGoal = async (e) => {
    e.preventDefault();
    if (!newGoal.trim()) return;

    try {
      const res = await axiosInstance.post("/goals", { text: newGoal });
      setGoals([...goals, res.data]);
      setNewGoal("");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🎯 My Fitness Goals</h1>
      <p>Track and achieve your fitness milestones!</p>

      <form onSubmit={addGoal} style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Enter new goal"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          style={{ padding: "8px", width: "300px" }}
        />
        <button type="submit" style={{ padding: "8px 15px", marginLeft: "10px" }}>
          Add Goal
        </button>
      </form>

      <ul style={{ marginTop: "20px", listStyle: "none", padding: 0 }}>
        {goals.length > 0 ? (
          goals.map((goal) => (
            <li
              key={goal._id}
              style={{
                padding: "10px",
                background: "#f4f4f4",
                marginBottom: "8px",
                borderRadius: "5px",
              }}
            >
              {goal.text}
            </li>
          ))
        ) : (
          <p>No goals yet. Start adding one today! 🚀</p>
        )}
      </ul>
    </div>
  );
};

export default Goals;
