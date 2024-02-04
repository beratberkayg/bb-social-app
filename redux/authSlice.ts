import { initialStateProps } from "@/app/type";
import { auth, db } from "@/utils/firebase";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const initialState: initialStateProps = {
  name: "",
  email: "",
  password: "",
  isLoading: false,
};

export const register = createAsyncThunk(
  "auth/register",
  async (
    {
      name,
      email,
      password,
    }: { name: string; email: string; password: string },
    { dispatch }
  ) => {
    try {
      dispatch(changeLoading(true));
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user.user, { displayName: name });
      await setDoc(doc(db, "users", user.user.uid), {
        name: user.user.displayName,
        email: user.user.email,
        id: user.user.uid,
        password: password,
        photo: user.user.photoURL,
      });

      dispatch(changeLoading(false));
    } catch (error) {
      console.error("Error during registration:", error);

      dispatch(changeLoading(false));
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { dispatch }
  ) => {
    try {
      dispatch(changeLoading(true));

      await signInWithEmailAndPassword(auth, email, password);

      dispatch(changeLoading(false));
    } catch (error) {
      console.error("Error during login:", error);
      dispatch(changeLoading(false));
    }
  }
);

export const logOut = createAsyncThunk(
  "auth/logOut",
  async ({}, { dispatch }) => {
    try {
      dispatch(changeLoading(true));

      await signOut(auth);

      dispatch(changeLoading(false));
    } catch (error) {
      console.error("Error during logout:", error);
      dispatch(changeLoading(false));
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeName: (state, action) => {
      state.name = action.payload;
    },
    changeEmail: (state, action) => {
      state.email = action.payload;
    },
    changePassword: (state, action) => {
      state.password = action.payload;
    },
    changeLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { changeName, changeEmail, changePassword, changeLoading } =
  authSlice.actions;

export default authSlice.reducer;
