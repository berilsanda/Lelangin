import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userData: {
    uid: '',
    email: '',
    displayName: '',
    photoUrl: ''
  }
};

export const persistSlice = createSlice({
  name: "persist",
  initialState,
  reducers: {
    setUser:(state, action) => {
      state.userData = action.payload
    }
  },
});

export const {
  setUser
} = persistSlice.actions;

export default persistSlice.reducer;
