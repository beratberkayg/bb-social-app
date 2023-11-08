import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface ModalState {
  modal: boolean;
}

// Define the initial state using that type
const initialState: ModalState = {
  modal: false,
};

export const modalSlice = createSlice({
  name: "modal",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
});

export const {} = modalSlice.actions;

export default modalSlice.reducer;
