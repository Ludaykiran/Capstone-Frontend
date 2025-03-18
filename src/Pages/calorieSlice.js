import { createSlice } from '@reduxjs/toolkit';
const loadFromLocalStorage = () => {
  const storedData = localStorage.getItem('calorieData');
  return storedData ? JSON.parse(storedData) : [];
};

const calorieSlice = createSlice({
  name: 'calories',
  initialState: loadFromLocalStorage(),
  reducers: {
    logCalorie: (state, action) => {
      state.push(action.payload);
      localStorage.setItem('calorieData', JSON.stringify(state)); // Save to localStorage
    },
    clearCalories: (state) => {
      state.length = 0; // Clear the array
      localStorage.removeItem('calorieData'); // Remove from localStorage
    },
  },
});

export const { logCalorie, clearCalories } = calorieSlice.actions;
export default calorieSlice.reducer;
