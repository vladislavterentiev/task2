// reducers.js
import { createSlice } from '@reduxjs/toolkit';

// Начальное состояние
const initialState = {
  items: [], // Массив объектов
};

const plannerSlice = createSlice({
  name: 'planner',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    updateItemPosition: (state, action) => {
      const { id, x, y } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.x = x;
        item.y = y;
      }
    },
    deleteItem: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
  },
});

export const { addItem, updateItemPosition, deleteItem } = plannerSlice.actions;

export default plannerSlice.reducer;