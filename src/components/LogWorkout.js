import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addWorkout, deleteWorkout, updateWorkout } from "../Pages/workoutSlice";
import "./Logworkout.css";
import './style.css'

const LogWorkout = () => {
  const dispatch = useDispatch();
  const workouts = useSelector((state) => state.workouts);
  const [workoutType, setWorkoutType] = useState("");
  const [duration, setDuration] = useState("");
  const [caloriesBurned, setCaloriesBurned] = useState("");
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [editedWorkout, setEditedWorkout] = useState({});

  // List of common workouts
  const workoutOptions = [
    "Push-ups",
    "Squats",
    "Lunges",
    "Plank",
    "Jump Rope",
    "Running",
    "Cycling",
    "Yoga",
    "Bench Press",
    "Deadlifts",
  ];

  const handleAddWorkout = () => {
    if (workoutType && duration && caloriesBurned) {
      dispatch(
        addWorkout({
          id: Date.now(),
          type: workoutType,
          duration: Number(duration),
          caloriesBurned: Number(caloriesBurned),
          date: new Date().toISOString(),
        })
      );
      setWorkoutType("");
      setDuration("");
      setCaloriesBurned("");
    }
  };

  const handleDeleteWorkout = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this?");
    if (confirmDelete) {
      dispatch(deleteWorkout(id));
    }
  };

  const handleEditWorkout = (workout) => {
    setEditingWorkout(workout.id);
    setEditedWorkout({ ...workout });
  };

  const handleConfirmEdit = () => {
    const confirmEdit = window.confirm("Are you sure you want to save the changes?");
    if (confirmEdit) {
      dispatch(updateWorkout({ id: editedWorkout.id, updatedData: editedWorkout }));
      setEditingWorkout(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingWorkout(null);
  };

  return (
    <div className="container">
      <h2 className="logworkout-header">Log Workout</h2>
      <div className="input-group">
        <select className="input-group-select" value={workoutType} onChange={(e) => setWorkoutType(e.target.value)}>
          <option value="">Select Workout</option>
          {workoutOptions.map((exercise, index) => (
            <option key={index} value={exercise}>
              {exercise}
            </option>
          ))}
        </select>
        <input type="number" className="table-input" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Time Spent (mins)" />
        <input type="number" className="table-input" value={caloriesBurned} onChange={(e) => setCaloriesBurned(e.target.value)} placeholder="Calories Burned" />
        <button onClick={handleAddWorkout}>Add Workout</button>
      </div>

      {/* ✅ Scrollable table container */}
      <div className="workout-table-container">
        <table className="workout-table">
          <thead>
            <tr className="row-color">
              <th>Workout</th>
              <th>Time Spent (mins)</th>
              <th>Calories Burnt</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout) => (
              <tr key={workout.id}>
                {editingWorkout === workout.id ? (
                  <>
                    <td>
                      <select value={editedWorkout.type} onChange={(e) => setEditedWorkout({ ...editedWorkout, type: e.target.value })}>
                        {workoutOptions.map((exercise, index) => (
                          <option key={index} value={exercise}>
                            {exercise}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input type="number" className="table-input" value={editedWorkout.duration} onChange={(e) => setEditedWorkout({ ...editedWorkout, duration: Number(e.target.value) })} />
                    </td>
                    <td>
                      <input type="number" className="table-input" value={editedWorkout.caloriesBurned} onChange={(e) => setEditedWorkout({ ...editedWorkout, caloriesBurned: Number(e.target.value) })} />
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="confirm-btn" onClick={handleConfirmEdit}>✔️ Confirm</button>
                        <button className="cancel-btn" onClick={handleCancelEdit}>❌ Cancel</button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{workout.type}</td>
                    <td>{workout.duration}</td>
                    <td>{workout.caloriesBurned} kcal</td>
                    <td>
                      <div className="action-buttons">
                        <button className="edit-btn" onClick={() => handleEditWorkout(workout)}>✏️ Edit</button>
                        <button className="delete-btn" onClick={() => handleDeleteWorkout(workout.id)}>🗑️ Delete</button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LogWorkout;
