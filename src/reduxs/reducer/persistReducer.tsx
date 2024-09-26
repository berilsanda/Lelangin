import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userData: {
    uid: "",
    email: "",
    emailVerified: false,
    displayName: "",
    photoURL: "",
    address: {
      city: '',
      streetAddress: '',
      zipCode: '',
    },
    createdAt: '',
    favorites: [],
    lastLogin:'',
    phoneNumber: '',
    updateAt: '',
  },
};

export const persistSlice = createSlice({
  name: "persist",
  initialState,
  reducers: {
    setUser: (state, action) => {
      let newUserData = { ...state.userData, ...action.payload };
      state.userData = newUserData;
    },
    resetUser: (state) => {
      state.userData = initialState.userData;
    },
  },
});

export const { setUser, resetUser } = persistSlice.actions;

export default persistSlice.reducer;
