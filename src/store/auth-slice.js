import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  id: null,
  isAuthenticated: false,
  role: null,
  firstName: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    saveAuth(state, { payload }) {
      const { id, role, firstName, token } = payload;
      console.log("[auth-slice.js] payload ", id, firstName);
      state.id = id;
      state.role = role;
      state.firstName = firstName;
      state.token = token;
      state.isAuthenticated = !!token;
    },
    clearAuth(state) {
      state = initialAuthState;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
