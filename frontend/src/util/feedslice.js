import { createSlice } from "@reduxjs/toolkit";

const feedslice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addfeed: (state, action) => {
      return action.payload;
    },
    removefeed: (state, action) => {
      const newfeed = state.filter((user) => user._id != action.payload);
      return newfeed;
    },
  },
});

export const { addfeed, removefeed } = feedslice.actions;
export default feedslice.reducer;
