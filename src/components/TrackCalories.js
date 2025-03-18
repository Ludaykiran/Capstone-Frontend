import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logCalorie, clearCalories } from '../Pages/calorieSlice';
import './TrackCalories.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const TrackCalories = () => {
  const dispatch = useDispatch();
  const calories = useSelector((state) => state.calories);
  const [foodItem, setFoodItem] = useState('');
  const [caloriesCount, setCaloriesCount] = useState('');
  const [showData, setShowData] = useState(false); // Toggle visibility

  const handleLogCalorie = () => {
    if (foodItem && caloriesCount) {
      dispatch(
        logCalorie({
          id: Date.now(),
          food: foodItem,
          calories: Number(caloriesCount),
        })
      );
      setFoodItem('');
      setCaloriesCount('');
    }
  };

  const handleClearCalories = () => {
    const confirmClear = window.confirm("Are you sure you want to clear all calorie data?");
    if (confirmClear) {
      dispatch(clearCalories());
    }
  };

  // Prepare data for the Pie chart
  const chartData = {
    labels: calories.map((entry) => entry.food),
    datasets: [
      {
        label: 'Calories',
        data: calories.map((entry) => entry.calories),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8AB64D', '#5C8F2C'],
      },
    ],
  };

  return (
    <div className="calorie-page">
      {/* Left Container: Inputs, Buttons, List */}
      <div className="calorie-container">
        <h2 className='calories-header'>Track Calories</h2>
        {/* Input Section */}
        <div className="input-container">
          <input
            className='calorie-input'
            type="text"
            value={foodItem}
            onChange={(e) => setFoodItem(e.target.value)}
            placeholder="Food Item"
          />
          <input
            className='calorie-input'
            type="number"
            value={caloriesCount}
            onChange={(e) => setCaloriesCount(e.target.value)}
            placeholder="Calories"
          />
      <div className='button-group'>
          <button onClick={handleLogCalorie} className='button-width'>Log Calorie</button>
          <button className="clear-btn button-width" onClick={handleClearCalories}>Clear All</button>
        {/* Dropdown Button to Toggle Data Visibility */}
        <button className="toggle-btn button-width" onClick={() => setShowData(!showData)}>
          {showData ? 'Hide Data' : 'Show Data'}
        </button>
        </div>
      </div>
        {/* Scrollable Calorie List - Only visible when "Show Data" is clicked */}
        <div className={`calorie-list-container ${showData ? 'show' : ''}`}>
          <ul className="calorie-list">
            {calories.map((entry) => (
              <li key={entry.id}>
                <strong>{entry.food}</strong> - {entry.calories} kcal
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Container: Pie Chart */}
      <div className="chart-container">
        <Pie data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
    </div>
  );
};

export default TrackCalories;

