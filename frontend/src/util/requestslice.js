import { createSlice } from "@reduxjs/toolkit";

const requestslice = createSlice({
  name: "request",
  initialState: [],
  reducers: {
    addrequest: (state, action) => {
      return action.payload;
    },
    removerequest: (state, action) => {
      const newarr = state.filter((req) => req._id != action.payload);
      return newarr;
    },
  },
});

export const { addrequest, removerequest } = requestslice.actions;
export default requestslice.reducer;
