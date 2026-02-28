import { createSlice } from "@reduxjs/toolkit";

const requestslice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    addrequest: (state, action) => {
      return action.payload;
    },
    removerequest: (state, action) => {
      return null;
    },
  },
});

export const { addrequest, removerequest } = requestslice.actions;
export default requestslice.reducer;
