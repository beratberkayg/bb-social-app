import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  loginModal: boolean;
  postModal: boolean;
}

const initialState: ModalState = {
  loginModal: false,
  postModal: false,
};

export const modalSlice = createSlice({
  name: "modal",

  initialState,
  reducers: {
    loginFunc: (state) => {
      state.loginModal = !state.loginModal;
    },
    postFunc: (state) => {
      state.postModal = !state.postModal;
    },
  },
});

export const { loginFunc, postFunc } = modalSlice.actions;

export default modalSlice.reducer;
