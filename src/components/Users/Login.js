import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveAuth, clearAuth } from "../../store/auth-thunks";

// MUI
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { Button, TextField } from "@mui/material";

import Container from "../UI/Container";
import classes from "./Login.module.css";
import { useLoginMutation } from "../../services/auth-service";

const defaultInputs = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [login, { isLoading, isError, error }] = useLoginMutation();
  const [formInputs, setFormInputs] = useState(defaultInputs);

  const inputChangeHandler = (e) => {
    setFormInputs((prevInputs) => {
      const newInputs = { ...prevInputs };
      newInputs[e.target.name] = e.target.value;
      return newInputs;
    });
  };

  const logoutHandler = () => {
    console.log("logging out");
    dispatch(clearAuth());
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // TODO: validation here
    try {
      const user = await login(formInputs);
      if (!user.error) dispatch(saveAuth(user.data.data));
    } catch (error) {
      // api call error - error connecting - pls check your network or try again later.
      console.log("catch error", error);
    }
  };

  if (isLoading)
    return (
      <Container>
        <CircularProgress />
      </Container>
    );

  if (auth.isAuthenticated)
    return (
      <Container>
        <h1>Welcome {auth.firstName}</h1>
        <button type="submit" onClick={logoutHandler}>
          Logout
        </button>
      </Container>
    );
  else
    return (
      <Container>
        <div className={classes.login}>
          <h1>Login</h1>
          <form onSubmit={submitHandler}>
            <TextField
              id="email"
              label="Email"
              name="email"
              variant="outlined"
              value={formInputs.email}
              onChange={inputChangeHandler}
              size="small"
              required
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              variant="outlined"
              type="password"
              value={formInputs.password}
              onChange={inputChangeHandler}
              size="small"
              required
            />

            <Button variant="contained" type="submit">
              Login
            </Button>
          </form>
          {isError && (
            <Alert severity="error">Error: {error.data.message} </Alert>
          )}
        </div>
      </Container>
    );
};

export default Login;
