import React from 'react';
import { useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import './ViewTrends.css';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);
const ViewTrends = () => {
  const workouts = useSelector(state => state.workouts);
  const calories = useSelector(state => state.calories);
  const labels = workouts.length > calories.length
    ? workouts.map((_, index) => `Workout ${index + 1}`)
    : calories.map((_, index) => `Entry ${index + 1}`);
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Workout Duration (mins)',
        data: workouts.map(workout => workout.duration),
        borderColor: '#36A2EB', // Blue
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 8,
        tension: 0.4,
      },
      {
        label: 'Calories Burned',
        data: workouts.map(workout => workout.caloriesBurned),
        borderColor: '#FF6384', // Red
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 8,
        tension: 0.4,
      },
      {
        label: 'Calories Consumed',
        data: calories.map(entry => entry.calories),
        borderColor: '#4BC0C0', // Green
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 8,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: { size: 14 },
        bodyFont: { size: 14 },
      },
    },
    scales: {
      x: {
        ticks: {
          font: { size: 14 },
        },
      },
      y: {
        ticks: {
          font: { size: 14 },
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="trends-container">
      <h2 className="trends-header">Workout & Calorie Trends</h2>
      <div className="chart-wrapper">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default ViewTrends;
