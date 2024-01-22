import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { db } from "@/utils/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { POST } from "@/app/type";

interface stateType {
  posts: POST[];
}

const initialState: stateType = {
  posts: [],
};

export const getPosts = createAsyncThunk("postSlice/getPosts", async () => {
  const ref = collection(db, "posts");
  const q = query(ref, orderBy("time", "desc"));

  return new Promise<POST[]>((resolve) => {
    const unsub = onSnapshot(q, (snap) => {
      const posts = snap.docs.map((doc) => ({ ...(doc.data() as POST) }));
      resolve(posts);
    });
  });
});

const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
  },
});

export const {} = postSlice.actions;

export default postSlice.reducer;
