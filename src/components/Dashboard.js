import React from "react";
import { useSelector } from "react-redux";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import "./Dashboard.css";

const Dashboard = () => {
  const workouts = useSelector((state) => state.workouts);

  // Compute total calories burned dynamically
  const totalCalories = workouts.reduce((acc, workout) => acc + workout.caloriesBurned, 0);
  const totalWorkouts = workouts.length;
  const averageCalories = totalWorkouts ? (totalCalories / totalWorkouts).toFixed(2) : 0;

  // Generate last 7 days (ensuring missing days are included)
  const last7Days = [...Array(7)].map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  }).reverse(); // Reverse to show earliest day first

  // Initialize with all days set to 0
  const weeklyCalories = last7Days.reduce((acc, day) => {
    acc[day] = 0;
    return acc;
  }, {});

  // Fill with actual workout data
  workouts.forEach((workout) => {
    const date = new Date(workout.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
    if (weeklyCalories[date] !== undefined) {
      weeklyCalories[date] += workout.caloriesBurned;
    }
  });

  // Prepare data for the Bar chart
  const weeklyData = {
    labels: Object.keys(weeklyCalories),
    datasets: [
      {
        label: "Weekly Calories Burned",
        data: Object.values(weeklyCalories),
        backgroundColor: "#8AB64D",
        borderColor: "#5C8F2C",
        borderWidth: 1,
      },
    ],
  };

  // Categorize workouts dynamically
  const workoutCounts = {};
  workouts.forEach((workout) => {
    workoutCounts[workout.type] = (workoutCounts[workout.type] || 0) + 1;
  });

  const workoutCategories = {
    labels: Object.keys(workoutCounts),
    datasets: [
      {
        label: "Workout Categories",
        data: Object.values(workoutCounts),
        backgroundColor: ["#6A5ACD", "#8A2BE2", "#FF1493", "#2E8B57"],
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-header">Dashboard</h2>

      {/* Stats Section */}
      <div className="stats-container">
        <div className="stat-box">
          <h4>Calories Burned</h4>
          <p>{totalCalories.toFixed(2)} kcal</p>
        </div>
        <div className="stat-box">
          <h4>Workouts</h4>
          <p>{totalWorkouts}</p>
        </div>
        <div className="stat-box">
          <h4>Avg Calories Burned</h4>
          <p>{averageCalories} kcal</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-container">
        <div className="chart-box">
          <h4>Weekly Calories Burned</h4>
          <Bar data={weeklyData} />
        </div>
        <div className="chart-box">
          <h4>Workout Categories</h4>
          <Pie data={workoutCategories} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
