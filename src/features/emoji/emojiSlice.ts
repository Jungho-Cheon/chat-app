import { createSlice } from '@reduxjs/toolkit';
import { RootStateOrAny } from 'react-redux';

const emojiSlice = createSlice({
  name: 'emoji',
  initialState: false,
  reducers: {
    toggleEmojiContainer(state) {
      return !state;
    },
  },
});

export const isEmojiOpenedSelector = (state: RootStateOrAny): boolean =>
  state.emoji;

export const { toggleEmojiContainer } = emojiSlice.actions;

export default emojiSlice.reducer;
