import { configureStore } from '@reduxjs/toolkit';
import workoutReducer from '../Pages/workoutSlice';
import calorieReducer from '../Pages/calorieSlice';

export const store = configureStore({
  reducer: {
    workouts: workoutReducer,
    calories: calorieReducer,
  },
});