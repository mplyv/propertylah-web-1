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
    login(state, action) {
      const { id, role, firstName, token } = action.payload;
      state.id = id;
      state.role = role;
      state.firstName = firstName;
      state.token = token;
      state.isAuthenticated = !!token;
    },
    logout(state) {
      state = initialAuthState;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
