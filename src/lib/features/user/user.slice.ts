import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    email: "",
    profile_picture: "",
    isLoggedIn: false,
    access_token: "",
    role: "",
  },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.profile_picture = action.payload.profile_picture;
      state.isLoggedIn = !!action.payload.email;
      state.access_token = action.payload.access_token;
      state.role = action.payload.role;
    },
    clearUser: (state) => {
      state.name = "";
      state.email = "";
      state.profile_picture = "";
      state.isLoggedIn = false;
      state.access_token = "";
      state.role = "";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
