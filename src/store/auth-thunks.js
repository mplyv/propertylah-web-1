import { authActions } from "./auth-slice";

export const saveAuth = (user, rememberMe = false) => {
  return (dispatch) => {
    const { id, firstName, role, token, photo } = user;

    if (rememberMe)
      localStorage.setItem(
        "auth",
        JSON.stringify({ token, firstName, role, id, photo })
      );

    dispatch(authActions.saveAuth(user));
  };
};

export const clearAuth = () => {
  return (dispatch) => {
    localStorage.removeItem("auth");
    dispatch(authActions.clearAuth());
  };
};

// for fetching auth from localStorage on load
export const fetchAuth = () => {
  return (dispatch) => {
    if (localStorage.getItem("auth")) {
      const user = JSON.parse(localStorage.getItem("auth"));

      dispatch(authActions.saveAuth(user));
    }
  };
};
