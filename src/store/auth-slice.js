import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  id: null,
  isAuthenticated: false,
  role: null,
  firstName: null,
  token: null,
  photo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    saveAuth(state, { payload }) {
      const { id, role, firstName, token, photo } = payload;
      state.id = id;
      state.role = role;
      state.firstName = firstName;
      state.token = token;
      state.isAuthenticated = !!token;
      state.photo = photo;
    },
    clearAuth(state) {
      state.id = null;
      state.role = null;
      state.firstName = null;
      state.token = null;
      state.isAuthenticated = false;
      state.photo = null;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
