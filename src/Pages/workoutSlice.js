import { createSlice } from "@reduxjs/toolkit";

// Load workouts from localStorage if available
const loadWorkouts = () => {
  const savedWorkouts = localStorage.getItem("workouts");
  return savedWorkouts ? JSON.parse(savedWorkouts) : [];
};

const workoutSlice = createSlice({
  name: "workouts",
  initialState: loadWorkouts(),
  reducers: {
    addWorkout: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("workouts", JSON.stringify(state));
    },

    deleteWorkout: (state, action) => {
      const updatedWorkouts = state.filter((workout) => workout.id !== action.payload);
      localStorage.setItem("workouts", JSON.stringify(updatedWorkouts));
      return updatedWorkouts;
    },

    updateWorkout: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.findIndex((workout) => workout.id === id);
      if (index !== -1) {
        state[index] = { ...state[index], ...updatedData };
        localStorage.setItem("workouts", JSON.stringify(state));
      }
    },

    clearWorkouts: (state) => {
      state.length = 0;
      localStorage.removeItem("workouts");
    },
  },
});

export const { addWorkout, deleteWorkout, updateWorkout, clearWorkouts } = workoutSlice.actions;
export default workoutSlice.reducer;