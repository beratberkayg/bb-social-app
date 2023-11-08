import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  modal: boolean;
}

const initialState: ModalState = {
  modal: false,
};

export const modalSlice = createSlice({
  name: "modal",

  initialState,
  reducers: {
    modalFunch: (state) => {
      state.modal = !state.modal;
    },
  },
});

export const { modalFunch } = modalSlice.actions;

export default modalSlice.reducer;
