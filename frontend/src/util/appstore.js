import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userslice";
import feedReducer from "./feedslice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
  },
});
