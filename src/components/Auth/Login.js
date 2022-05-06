// TODO:
// remember me - config in thunk
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";

import { saveAuth, clearAuth } from "../../store/auth-thunks";

// MUI
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
// import { Button, TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
// import CssBaseline from '@mui/material/CssBaseline';
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import Container from "../UI/Container";
// import classes from "./Login.module.css";
import { useLoginMutation } from "../../services/auth-service";

const defaultInputs = {
  email: "",
  password: "",
  rememberMe: false,
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [login, { isLoading, isError, error }] = useLoginMutation();
  const [formInputs, setFormInputs] = useState(defaultInputs);
  const [rememberMe, setRememberMe] = useState(false);

  const inputChangeHandler = (e) => {
    setFormInputs((prevInputs) => {
      const newInputs = { ...prevInputs };
      newInputs[e.target.name] = e.target.value;
      return newInputs;
    });
  };

  const logoutHandler = () => {
    dispatch(clearAuth());
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    console.log("[Login.js] rememberMe", rememberMe);
    try {
      const user = await login(formInputs);
      if (!user.error) {
        setFormInputs(defaultInputs);
        dispatch(saveAuth(user.data.data, rememberMe));
      }
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
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <h1>Log in</h1>
          {isError && (
            <Alert severity="error">
              Error:
              {error.data?.message
                ? error.data.message
                : " Please check your connection or try again later."}
            </Alert>
          )}
          <Box
            component="form"
            onSubmit={submitHandler}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formInputs.email}
              onChange={inputChangeHandler}
              // onFocus={()=>{}}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formInputs.password}
              onChange={inputChangeHandler}
            />
            <FormControlLabel
              control={<Checkbox value={rememberMe} color="primary" />}
              label="Remember me"
              name="rememberMe"
              onChange={() => {
                setRememberMe(!rememberMe);
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <NavLink to="/signup">Don't have an account? Sign Up</NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    );
};

export default Login;
