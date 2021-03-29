import { createSlice } from '@reduxjs/toolkit';
import { RootStateOrAny } from 'react-redux';

const themeSlice = createSlice({
  name: 'theme',
  initialState: true,
  reducers: {
    toggleTheme(state) {
      return !state;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export const getCurrentTheme = (state: RootStateOrAny): boolean => state.theme;

export default themeSlice.reducer;
