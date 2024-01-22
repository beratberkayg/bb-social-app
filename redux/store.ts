import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modalSlice";
import authSlice from "./authSlice";
import postSlice from "./postSlice";

export const store = configureStore({
  reducer: {
    modal: modalSlice,
    auth: authSlice,
    posts: postSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
