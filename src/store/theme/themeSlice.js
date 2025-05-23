// store/themeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'navy', // Tema predeterminado
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { 
    setTheme
} = themeSlice.actions;